const socket = io();
// const io = new Server(server, {
//     cors: {
//         origin: "https://beamish-palmier-9359d7.netlify.app",
//         methods: ["GET", "POST"]
//     }
// });

// ==================================================
// THREE.JS 기본 설정
// ==================================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x87ceeb);


// 카메라
const camera =
    new THREE.PerspectiveCamera(
        75,
        window.innerWidth /
            window.innerHeight,
        0.1,
        1000
    );


// 렌더러
const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

document.body.appendChild(
    renderer.domElement
);


// ==================================================
// 조명
// ==================================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.5
    );

scene.add(
    ambientLight
);


const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

directionalLight.position.set(
    5,
    10,
    5
);

scene.add(
    directionalLight
);


// ==================================================
// 바닥
// ==================================================

const groundGeometry =
    new THREE.PlaneGeometry(
        100,
        100
    );

const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x3e8e41
    });

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x =
    -Math.PI / 2;

scene.add(
    ground
);


// ==================================================
// 그리드
// ==================================================

const grid =
    new THREE.GridHelper(
        100,
        100
    );

grid.position.y = 0.01;

scene.add(
    grid
);


// ==================================================
// 플레이어
// ==================================================

const players = {};

let myId = null;


// ==================================================
// FPS 카메라
// ==================================================

// 좌우
let yaw = 0;

// 위아래
let pitch = 0;

// 감도
const mouseSensitivity =
    0.002;


// ==================================================
// 네트워크 상태 동기화
// ==================================================

let rotationChanged =
    false;

let crouchChanged =
    false;

let lastStateSendTime =
    0;

const stateSendInterval =
    30;


// ==================================================
// 이동 설정
// ==================================================

const walkSpeed =
    0.08;

const runSpeed =
    0.15;

const crouchSpeed =
    0.045;


// ==================================================
// 점프 설정
// ==================================================

let verticalVelocity =
    0;

const jumpPower =
    0.18;

const gravity =
    0.008;

let isGrounded =
    true;


// 플레이어 루트 중심 높이
const groundPlayerY =
    0.5;


// ==================================================
// 카메라 높이
// ==================================================

const standingEyeHeight =
    0.8;

const crouchingEyeHeight =
    0.25;

let currentEyeHeight =
    standingEyeHeight;


// ==================================================
// 플레이어 생성
// ==================================================

function createPlayer(
    id,
    x,
    y,
    z,
    isMe = false,
    crouching = false
) {

    // 실제 위치를 담당하는 부모
    const root =
        new THREE.Group();


    root.position.set(
        x,
        y,
        z
    );


    // 보이는 블록
    const geometry =
        new THREE.BoxGeometry(
            1,
            1,
            1
        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                isMe
                    ? 0x0088ff
                    : 0xff4444

        });


    const visual =
        new THREE.Mesh(
            geometry,
            material
        );


    root.add(
        visual
    );


    scene.add(
        root
    );


    // 자기 캐릭터는
    // FPS 화면에서 숨김
    if (isMe) {

        visual.visible =
            false;

    }


    // players[id] = {

    //     root: root,

    //     visual: visual,

    //     isMe: isMe,

    //     crouching:
    //         crouching

    // };
    players[id] = {

        root: root,

        visual: visual,

        isMe: isMe,

        crouching:
            crouching,

        targetScaleY:
            crouching ? 0.5 : 1,

        targetVisualY:
            crouching ? -0.25 : 0

    };


    // 최초 웅크림 상태 적용
    applyCrouchVisual(
        players[id],
        crouching,
        true
    );


    updatePlayerCount();
}


// ==================================================
// 웅크리기 모양 적용
// ==================================================

// function applyCrouchVisual(
//     player,
//     crouching,
//     immediate = false
// ) {

//     if (!player) {
//         return;
//     }


//     player.crouching =
//         crouching;


//     const visual =
//         player.visual;


//     if (crouching) {

//         // 블록 높이 절반
//         visual.scale.y =
//             0.5;

//         // 아래쪽이 바닥에 붙도록
//         // 중심을 0.25 아래로 이동
//         visual.position.y =
//             -0.25;

//     }
//     else {

//         visual.scale.y =
//             1;

//         visual.position.y =
//             0;

//     }

// }

function applyCrouchVisual(
    player,
    crouching,
    immediate = false
) {

    if (!player) {
        return;
    }

    player.crouching = crouching;

    // 목표값만 저장
    player.targetScaleY =
        crouching ? 0.5 : 1;

    player.targetVisualY =
        crouching ? -0.25 : 0;


    // 처음 생성될 때만 즉시 적용
    if (immediate) {

        player.visual.scale.y =
            player.targetScaleY;

        player.visual.position.y =
            player.targetVisualY;

    }
}


// ==================================================
// 접속 완료
// ==================================================

socket.on(
    "connect",
    () => {

        myId =
            socket.id;


        console.log(
            "내 Socket ID:",
            myId
        );


        const connectionElement =
            document.getElementById(
                "connection"
            );


        if (connectionElement) {

            connectionElement.textContent =
                "서버 연결됨";

        }

    }
);


// ==================================================
// 현재 플레이어 목록
// ==================================================

socket.on(
    "currentPlayers",
    (serverPlayers) => {

        for (
            const id in serverPlayers
        ) {

            if (players[id]) {
                continue;
            }


            const player =
                serverPlayers[id];


            createPlayer(
                id,
                player.x,
                player.y,
                player.z,
                id === myId,
                Boolean(
                    player.crouching
                )
            );

        }

    }
);


// ==================================================
// 새 플레이어 접속
// ==================================================

socket.on(
    "newPlayer",
    (player) => {

        if (
            players[player.id]
        ) {
            return;
        }


        createPlayer(
            player.id,
            player.x,
            player.y,
            player.z,
            false,
            Boolean(
                player.crouching
            )
        );

    }
);


// ==================================================
// 다른 플레이어 상태 수신
// ==================================================

socket.on(
    "playerMoved",
    (data) => {

        const player =
            players[data.id];


        if (!player) {
            return;
        }


        // 위치
        player.root.position.set(
            data.x,
            data.y,
            data.z
        );


        // 방향
        player.root.rotation.y =
            data.rotation;


        // 웅크리기
        applyCrouchVisual(
            player,
            Boolean(
                data.crouching
            )
        );

    }
);


// ==================================================
// 플레이어 퇴장
// ==================================================

socket.on(
    "playerDisconnected",
    (id) => {

        const player =
            players[id];


        if (!player) {
            return;
        }


        scene.remove(
            player.root
        );


        delete players[id];


        updatePlayerCount();

    }
);


// ==================================================
// 접속자 수
// ==================================================

function updatePlayerCount() {

    const element =
        document.getElementById(
            "playerCount"
        );


    if (!element) {
        return;
    }


    element.textContent =
        Object.keys(
            players
        ).length;

}


// ==================================================
// 마우스 잠금
// ==================================================

renderer.domElement.addEventListener(
    "click",
    () => {

        renderer.domElement
            .requestPointerLock();

    }
);


// ==================================================
// 마우스 시점
// ==================================================

document.addEventListener(
    "mousemove",
    (event) => {

        if (
            document.pointerLockElement !==
            renderer.domElement
        ) {
            return;
        }


        // 좌우
        yaw -=
            event.movementX *
            mouseSensitivity;


        // 위아래
        pitch -=
            event.movementY *
            mouseSensitivity;


        const limit =
            Math.PI / 2 -
            0.05;


        pitch =
            Math.max(
                -limit,
                Math.min(
                    limit,
                    pitch
                )
            );


        // 서버에 회전 변화 알림
        rotationChanged =
            true;

    }
);


// ==================================================
// 키 입력
// ==================================================

const keys = {};


function isGameKey(code) {

    return (

        code === "KeyW" ||

        code === "KeyA" ||

        code === "KeyS" ||

        code === "KeyD" ||

        code === "KeyC" ||

        code === "Space" ||

        code === "ShiftLeft" ||

        code === "ShiftRight"

    );

}


function handleKeyDown(
    event
) {

    if (
        isGameKey(
            event.code
        )
    ) {

        event.preventDefault();

    }


    // C가 새로 눌렸을 때만
    if (
        event.code === "KeyC" &&
        !keys["KeyC"]
    ) {

        crouchChanged =
            true;

    }


    keys[event.code] =
        true;

}


function handleKeyUp(
    event
) {

    if (
        isGameKey(
            event.code
        )
    ) {

        event.preventDefault();

    }


    if (
        event.code === "KeyC"
    ) {

        crouchChanged =
            true;

    }


    keys[event.code] =
        false;

}


window.addEventListener(
    "keydown",
    handleKeyDown,
    true
);


window.addEventListener(
    "keyup",
    handleKeyUp,
    true
);


// ==================================================
// 포커스 잃으면 키 초기화
// ==================================================

window.addEventListener(
    "blur",
    () => {

        const wasCrouching =
            Boolean(
                keys["KeyC"]
            );


        for (
            const key in keys
        ) {

            keys[key] =
                false;

        }


        if (wasCrouching) {

            crouchChanged =
                true;

        }

    }
);


// ==================================================
// 이동
// ==================================================

function movePlayer() {

    if (!myId) {
        return;
    }


    const player =
        players[myId];


    if (!player) {
        return;
    }


    const isRunning =

        Boolean(
            keys["ShiftLeft"] ||
            keys["ShiftRight"]
        );


    const isCrouching =

        Boolean(
            keys["KeyC"]
        );


    // ==================================================
    // 자기 웅크림 모양
    // ==================================================

    if (
        player.crouching !==
        isCrouching
    ) {

        applyCrouchVisual(
            player,
            isCrouching
        );

        crouchChanged =
            true;

    }


    // ==================================================
    // 속도
    // ==================================================

    let currentSpeed =
        walkSpeed;


    if (isRunning) {

        currentSpeed =
            runSpeed;

    }


    // 웅크리면 달리기보다
    // 웅크림 속도가 우선
    if (isCrouching) {

        currentSpeed =
            crouchSpeed;

    }


    // ==================================================
    // 방향 벡터
    // ==================================================

    let moveX = 0;
    let moveZ = 0;


    const forwardX =
        -Math.sin(yaw);

    const forwardZ =
        -Math.cos(yaw);


    const rightX =
        Math.cos(yaw);

    const rightZ =
        -Math.sin(yaw);


    // W
    if (
        keys["KeyW"]
    ) {

        moveX +=
            forwardX;

        moveZ +=
            forwardZ;

    }


    // S
    if (
        keys["KeyS"]
    ) {

        moveX -=
            forwardX;

        moveZ -=
            forwardZ;

    }


    // A
    if (
        keys["KeyA"]
    ) {

        moveX -=
            rightX;

        moveZ -=
            rightZ;

    }


    // D
    if (
        keys["KeyD"]
    ) {

        moveX +=
            rightX;

        moveZ +=
            rightZ;

    }


    // ==================================================
    // 대각선 속도 보정
    // ==================================================

    const length =
        Math.hypot(
            moveX,
            moveZ
        );


    let moved =
        false;


    if (
        length > 0
    ) {

        moveX /=
            length;

        moveZ /=
            length;


        player.root.position.x +=
            moveX *
            currentSpeed;


        player.root.position.z +=
            moveZ *
            currentSpeed;


        player.root.rotation.y =
            yaw;


        moved =
            true;

    }


    // ==================================================
    // 점프
    // ==================================================

    if (
        keys["Space"] &&
        isGrounded &&
        !isCrouching
    ) {

        verticalVelocity =
            jumpPower;


        isGrounded =
            false;

    }


    // ==================================================
    // 중력
    // ==================================================

    if (
        !isGrounded
    ) {

        verticalVelocity -=
            gravity;


        player.root.position.y +=
            verticalVelocity;


        // 바닥 도착
        if (
            player.root.position.y <=
            groundPlayerY
        ) {

            player.root.position.y =
                groundPlayerY;


            verticalVelocity =
                0;


            isGrounded =
                true;

        }


        moved =
            true;

    }


    // ==================================================
    // 이동 상태 서버 전송
    // ==================================================

    if (
        moved
    ) {

        sendPlayerState();

    }

}


// ==================================================
// 서버에 현재 플레이어 상태 전송
// ==================================================

function sendPlayerState() {

    if (!myId) {
        return;
    }


    const player =
        players[myId];


    if (!player) {
        return;
    }


    socket.emit(
        "playerMove",
        {

            x:
                player.root.position.x,

            y:
                player.root.position.y,

            z:
                player.root.position.z,

            rotation:
                yaw,

            crouching:
                Boolean(
                    keys["KeyC"]
                )

        }
    );

}


// ==================================================
// 회전 + 웅크리기 상태 동기화
// ==================================================

function syncPlayerState() {

    if (!myId) {
        return;
    }


    if (
        !rotationChanged &&
        !crouchChanged
    ) {
        return;
    }


    const now =
        performance.now();


    if (
        now -
        lastStateSendTime <
        stateSendInterval
    ) {
        return;
    }


    lastStateSendTime =
        now;


    rotationChanged =
        false;


    crouchChanged =
        false;


    const player =
        players[myId];


    if (!player) {
        return;
    }


    player.root.rotation.y =
        yaw;


    sendPlayerState();

}


// ==================================================
// FPS 카메라
// ==================================================

function updateCamera() {

    if (!myId) {
        return;
    }


    const player =
        players[myId];


    if (!player) {
        return;
    }


    const position =
        player.root.position;


    // ==================================================
    // 웅크리기 눈 높이
    // ==================================================

    const isCrouching =
        Boolean(
            keys["KeyC"]
        );


    const targetEyeHeight =

        isCrouching
            ? crouchingEyeHeight
            : standingEyeHeight;


    // 부드럽게 내려가고 올라오기
    currentEyeHeight +=

        (
            targetEyeHeight -
            currentEyeHeight
        ) * 0.15;


    const eyeHeight =
        currentEyeHeight;


    // ==================================================
    // 카메라 위치
    // ==================================================

    camera.position.set(

        position.x,

        position.y +
            eyeHeight,

        position.z

    );


    // ==================================================
    // 바라보는 방향
    // ==================================================

    const directionX =

        -Math.sin(yaw) *
        Math.cos(pitch);


    const directionY =

        Math.sin(pitch);


    const directionZ =

        -Math.cos(yaw) *
        Math.cos(pitch);


    camera.lookAt(

        position.x +
            directionX,

        position.y +
            eyeHeight +
            directionY,

        position.z +
            directionZ

    );

}


// ==================================================
// 화면 크기 변경
// ==================================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =

            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }
);


// ==================================================
// 게임 루프
// ==================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    movePlayer();


    syncPlayerState();
    updatePlayerVisuals();

    updateCamera();


    renderer.render(
        scene,
        camera
    );

}


// ==================================================
// 플레이어 외형 부드럽게 변경
// ==================================================

function updatePlayerVisuals() {

    for (const id in players) {

        const player =
            players[id];

        if (!player) {
            continue;
        }

        // 카메라 웅크림과 비슷한 속도
        const smoothSpeed =
            0.15;


        // 높이 부드럽게 변경
        player.visual.scale.y +=
            (
                player.targetScaleY -
                player.visual.scale.y
            ) * smoothSpeed;


        // 블록 중심 위치도
        // 같이 부드럽게 내려감
        player.visual.position.y +=
            (
                player.targetVisualY -
                player.visual.position.y
            ) * smoothSpeed;

    }
}


animate();