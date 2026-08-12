// // const socket = io();
// const socket = io("https://ymgame-server.onrender.com");
// // const io = new Server(server, {
// //     cors: {
// //         origin: "https://beamish-palmier-9359d7.netlify.app",
// //         methods: ["GET", "POST"]
// //     }
// // });

// // ==================================================
// // THREE.JS 기본 설정
// // ==================================================

// const scene =
//     new THREE.Scene();

// scene.background =
//     new THREE.Color(0xf3f3f1);


// // 카메라
// const camera =
//     new THREE.PerspectiveCamera(
//         62,
//         window.innerWidth /
//             window.innerHeight,
//         0.1,
//         1000
//     );


// // 렌더러
// const renderer =
//     new THREE.WebGLRenderer({
//         antialias: true
//     });

// renderer.setSize(
//     window.innerWidth,
//     window.innerHeight
// );

// renderer.setPixelRatio(
//     Math.min(
//         window.devicePixelRatio,
//         2
//     )
// );
// // ==================================================
// // 렌더링 색감 / 조명 품질
// // ==================================================

// renderer.outputColorSpace =
//     THREE.SRGBColorSpace;

// renderer.toneMapping =
//     THREE.ACESFilmicToneMapping;

// renderer.toneMappingExposure =
//     1.25;

// renderer.shadowMap.enabled =
//     true;

// renderer.shadowMap.type =
//     THREE.PCFSoftShadowMap;

// document.body.appendChild(
//     renderer.domElement
// );


// // ==================================================
// // 조명
// // ==================================================
// // 갤러리 맵
// // 참고 이미지 스타일
// // ==================================================


// // ==================================================
// // 기본 조명
// // ==================================================

// const ambientLight =
//     new THREE.AmbientLight(
//         0xffffff,
//         1.5
//     );

// scene.add(
//     ambientLight
// );


// // 위에서 들어오는 아주 부드러운 빛
// const hemiLight =
//     new THREE.HemisphereLight(
//         0xffffff,
//         0x8b8175,
//         1.5
//     );

// scene.add(
//     hemiLight
// );


// // 약한 방향광
// // ==========================================
// // 은은한 메인 그림자 조명
// // ==========================================

// const directionalLight =
//     new THREE.DirectionalLight(
//         0xfffdf8,
//         1.15
//     );

// directionalLight.position.set(
//     -4,
//     8,
//     5
// );

// // 그림자 활성화
// directionalLight.castShadow = true;

// // 그림자 품질
// directionalLight.shadow.mapSize.width = 2048;
// directionalLight.shadow.mapSize.height = 2048;

// // 그림자 가장자리 부드럽게
// directionalLight.shadow.radius = 5;

// // 그림자 깨짐 방지
// directionalLight.shadow.bias = -0.0003;

// // 그림자가 적용되는 범위
// directionalLight.shadow.camera.left = -12;
// directionalLight.shadow.camera.right = 12;
// directionalLight.shadow.camera.top = 12;
// directionalLight.shadow.camera.bottom = -12;

// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 30;

// // ★ 마지막에 반드시 씬에 추가
// scene.add(directionalLight);

// // ==================================================
// // 맵 크기
// // ==================================================

// const GALLERY_WIDTH =
//     18;

// const GALLERY_DEPTH =
//     18;

// const GALLERY_HEIGHT =
//     8;


// // ==================================================
// // 나무 바닥
// // ==================================================

// const floorCanvas =
//     document.createElement(
//         "canvas"
//     );

// floorCanvas.width =
//     1024;

// floorCanvas.height =
//     1024;


// const floorContext =
//     floorCanvas.getContext(
//         "2d"
//     );


// // 바닥 기본색
// floorContext.fillStyle =
//     "#766657";

// floorContext.fillRect(
//     0,
//     0,
//     1024,
//     1024
// );


// // ==================================================
// // 나무 판자 패턴
// // ==================================================

// const plankHeight =
//     64;


// for (
//     let y = 0;
//     y < 1024;
//     y += plankHeight
// ) {

//     const row =
//         y / plankHeight;


//     // 행마다 판자 위치 어긋나게
//     const offset =
//         row % 2 === 0
//             ? 0
//             : -128;


//     for (
//         let x = offset;
//         x < 1024;
//         x += 256
//     ) {

//         const brightness =
//             90 +
//             Math.random() * 30;


//         floorContext.fillStyle =
//             `rgb(
//                 ${brightness + 20},
//                 ${brightness + 5},
//                 ${brightness - 10}
//             )`;


//         floorContext.fillRect(
//             x + 1,
//             y + 1,
//             254,
//             plankHeight - 2
//         );


//         // 판자 경계선
//         floorContext.strokeStyle =
//             "rgba(40,30,20,0.22)";

//         floorContext.lineWidth =
//             2;

//         floorContext.strokeRect(
//             x,
//             y,
//             256,
//             plankHeight
//         );


//         // 아주 약한 나뭇결
//         for (
//             let i = 0;
//             i < 6;
//             i++
//         ) {

//             floorContext.strokeStyle =
//                 "rgba(70,45,30,0.10)";

//             floorContext.beginPath();

//             const grainY =
//                 y +
//                 Math.random() *
//                 plankHeight;

//             floorContext.moveTo(
//                 x,
//                 grainY
//             );

//             floorContext.lineTo(
//                 x + 256,
//                 grainY +
//                 Math.random() * 5
//             );

//             floorContext.stroke();
//         }
//     }
// }


// const floorTexture =
//     new THREE.CanvasTexture(
//         floorCanvas
//     );

// floorTexture.colorSpace =
//     THREE.SRGBColorSpace;

// floorTexture.wrapS =
//     THREE.RepeatWrapping;

// floorTexture.wrapT =
//     THREE.RepeatWrapping;

// floorTexture.repeat.set(
//     2.2,
//     2.2
// );


// const floorGeometry =
//     new THREE.PlaneGeometry(
//         GALLERY_WIDTH,
//         GALLERY_DEPTH
//     );


// const floorMaterial =
//     new THREE.MeshStandardMaterial({

//         map:
//             floorTexture,

//         roughness:
//             0.68,

//         metalness:
//             0

//     });


// const floor =
//     new THREE.Mesh(
//         floorGeometry,
//         floorMaterial
//     );


// floor.rotation.x =
//     -Math.PI / 2;

// floor.receiveShadow =
//     true;

// scene.add(
//     floor
// );


// // ==================================================
// // 벽 재질
// // ==================================================

// const wallMaterial =
//     new THREE.MeshStandardMaterial({

//         color:
//             0xf7f7f5,

//         roughness:
//             0.88,

//         metalness:
//             0

//     });


// // ==================================================
// // 벽 생성 함수
// // ==================================================

// function createWall(
//     x,
//     y,
//     z,
//     width,
//     height,
//     depth
// ) {

//     const geometry =
//         new THREE.BoxGeometry(
//             width,
//             height,
//             depth
//         );


//     const wall =
//         new THREE.Mesh(
//             geometry,
//             wallMaterial
//         );


//     wall.position.set(
//         x,
//         y,
//         z
//     );


//     wall.castShadow =
//         true;

//     wall.receiveShadow =
//         true;


//     scene.add(
//         wall
//     );


//     return wall;
// }


// // ==================================================
// // 외벽
// // ==================================================


// // 뒤쪽 벽
// createWall(
//     0,
//     GALLERY_HEIGHT / 2,
//     -9,

//     18,
//     GALLERY_HEIGHT,
//     0.18
// );


// // 왼쪽 벽
// createWall(
//     -9,
//     GALLERY_HEIGHT / 2,
//     0,

//     0.18,
//     GALLERY_HEIGHT,
//     18
// );


// // 오른쪽 벽
// createWall(
//     9,
//     GALLERY_HEIGHT / 2,
//     0,

//     0.18,
//     GALLERY_HEIGHT,
//     18
// );


// // 참고사진처럼
// // 카메라 쪽 앞벽은 없음


// // ==================================================
// // 중앙 메인 전시벽
// // ==================================================

// createWall(
//     0,
//     2.05,
//     -4.6,

//     8.6,
//     4.1,
//     0.24
// );


// // ==================================================
// // 중앙벽 뒤쪽 좌우 짧은 벽
// // 참고사진 통로 느낌
// // ==================================================

// createWall(
//     -6.75,
//     2.05,
//     -6.1,

//     4.3,
//     4.1,
//     0.20
// );


// createWall(
//     6.75,
//     2.05,
//     -6.1,

//     4.3,
//     4.1,
//     0.20
// );


// // ==================================================
// // 천장
// // ==================================================

// const ceilingGeometry =
//     new THREE.PlaneGeometry(
//         GALLERY_WIDTH,
//         GALLERY_DEPTH
//     );


// const ceilingMaterial =
//     new THREE.MeshStandardMaterial({

//         color:
//             0xffffff,

//         emissive:
//             0xffffff,

//         emissiveIntensity:
//             0.7,

//         roughness:
//             0.82,

//         metalness:
//             0,

//         side:
//             THREE.DoubleSide

//     });


// const ceiling =
//     new THREE.Mesh(
//         ceilingGeometry,
//         ceilingMaterial
//     );


// ceiling.rotation.x =
//     Math.PI / 2;

// ceiling.position.y =
//     GALLERY_HEIGHT;

// scene.add(
//     ceiling
// );


// // ==================================================
// // 천장 LED 격자
// // 아주 얇은 회색 프레임
// // ==================================================

// const gridMaterial =
//     new THREE.MeshStandardMaterial({

//         color:
//             0xa8a8a5,

//         roughness:
//             0.82,

//         metalness:
//             0

//     });


// // ==================================================
// // X 방향 프레임
// // ==================================================

// for (
//     let z = -9;
//     z <= 9;
//     z += 2.25
// ) {

//     const geometry =
//         new THREE.BoxGeometry(
//             18,
//             0.028,
//             0.035
//         );


//     const beam =
//         new THREE.Mesh(
//             geometry,
//             gridMaterial
//         );


//     beam.position.set(
//         0,
//         GALLERY_HEIGHT - 0.035,
//         z
//     );


//     scene.add(
//         beam
//     );
// }


// // ==================================================
// // Z 방향 프레임
// // ==================================================

// for (
//     let x = -9;
//     x <= 9;
//     x += 2.25
// ) {

//     const geometry =
//         new THREE.BoxGeometry(
//             0.035,
//             0.028,
//             18
//         );


//     const beam =
//         new THREE.Mesh(
//             geometry,
//             gridMaterial
//         );


//     beam.position.set(
//         x,
//         GALLERY_HEIGHT - 0.035,
//         0
//     );


//     scene.add(
//         beam
//     );
// }


// // ==================================================
// // 천장 조명
// //
// // PointLight 여러 개를 쓰지 않고
// // 큰 조명을 아주 부드럽게 분산
// // ==================================================

// // const lightPositions = [

// //     [-4.5, 4.35, -4.5],
// //     [ 0.0, 4.35, -4.5],
// //     [ 4.5, 4.35, -4.5],

// //     [-4.5, 4.35,  0.0],
// //     [ 0.0, 4.35,  0.0],
// //     [ 4.5, 4.35,  0.0],

// //     [-4.5, 4.35,  4.5],
// //     [ 0.0, 4.35,  4.5],
// //     [ 4.5, 4.35,  4.5]

// // ];
// // ==================================================
// // 넓은 천장 면광원
// // ==================================================

// const ceilingAreaLights = [

//     [-4.5, -4.5],
//     [ 0.0, -4.5],
//     [ 4.5, -4.5],

//     [-4.5,  0.0],
//     [ 0.0,  0.0],
//     [ 4.5,  0.0],

//     [-4.5,  4.5],
//     [ 0.0,  4.5],
//     [ 4.5,  4.5]

// ];


// for (
//     const [x, z]
//     of ceilingAreaLights
// ) {

//     const light =
//         new THREE.RectAreaLight(
//             0xffffff,
//             2.2,
//             5.5,
//             5.5
//         );

//     light.position.set(
//         x,
//         GALLERY_HEIGHT - 0.12,
//         z
//     );

//     light.rotation.x =
//         -Math.PI / 2;

//     scene.add(
//         light
//     );
// }


// // ==================================================
// // 벤치
// // ==================================================

// const benchGroup =
//     new THREE.Group();


// const benchMaterial =
//     new THREE.MeshStandardMaterial({

//         color:
//             0x272522,

//         roughness:
//             0.68

//     });


// // 윗판
// const benchTop =
//     new THREE.Mesh(

//         new THREE.BoxGeometry(
//             4.5,
//             0.22,
//             1.05
//         ),

//         benchMaterial
//     );


// benchTop.position.y =
//     0.72;

// benchTop.castShadow =
//     true;

// benchTop.receiveShadow =
//     true;

// benchGroup.add(
//     benchTop
// );


// // 왼쪽 다리
// const benchLegLeft =
//     new THREE.Mesh(

//         new THREE.BoxGeometry(
//             0.28,
//             0.7,
//             0.85
//         ),

//         benchMaterial
//     );


// benchLegLeft.position.set(
//     -1.8,
//     0.35,
//     0
// );

// benchLegLeft.castShadow =
//     true;

// benchGroup.add(
//     benchLegLeft
// );


// // 오른쪽 다리
// const benchLegRight =
//     new THREE.Mesh(

//         new THREE.BoxGeometry(
//             0.28,
//             0.7,
//             0.85
//         ),

//         benchMaterial
//     );


// benchLegRight.position.set(
//     1.8,
//     0.35,
//     0
// );

// benchLegRight.castShadow =
//     true;

// benchGroup.add(
//     benchLegRight
// );


// // 참고사진처럼 중앙 앞쪽
// benchGroup.position.set(
//     0,
//     0,
//     2.3
// );


// scene.add(
//     benchGroup
// );

// const socket = io();
const socket = io(
    "https://ymgame-server.onrender.com"
);


// ==================================================
// THREE.JS 기본 설정
// ==================================================

const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(
        0xf3f3f1
    );


// ==================================================
// 카메라
// ==================================================

const camera =
    new THREE.PerspectiveCamera(
        62,

        window.innerWidth /
            window.innerHeight,

        0.1,

        1000
    );


// ==================================================
// 렌더러
// ==================================================

const renderer =
    new THREE.WebGLRenderer({

        antialias:
            true

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


// ==================================================
// 렌더링 색감 / 조명 품질
// ==================================================

renderer.outputColorSpace =
    THREE.SRGBColorSpace;


renderer.toneMapping =
    THREE.ACESFilmicToneMapping;


renderer.toneMappingExposure =
    1.00;


renderer.shadowMap.enabled =
    true;


renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;


document.body.appendChild(
    renderer.domElement
);


// ==================================================
// 기본 조명
// ==================================================


// 전체가 너무 하얗게 날아가지 않도록
// 기존 1.5 -> 0.9
const ambientLight =
    new THREE.AmbientLight(

        0xffffff,

        0.55

    );


scene.add(
    ambientLight
);


// ==================================================
// 아주 부드러운 환경광
// ==================================================

const hemiLight =
    new THREE.HemisphereLight(
        0xffffff,
        0x70675f,
        0.8
    );


scene.add(
    hemiLight
);


// ==================================================
// 은은한 메인 그림자 조명
// ==================================================

const directionalLight =
    new THREE.DirectionalLight(

        0xfffdf8,

        1.15

    );


directionalLight.position.set(

    -4,

    8,

    5

);


// 그림자
directionalLight.castShadow =
    true;


// 그림자 품질
directionalLight.shadow.mapSize.width =
    2048;


directionalLight.shadow.mapSize.height =
    2048;


// 그림자 가장자리 부드럽게
directionalLight.shadow.radius =
    5;


// 그림자 깨짐 방지
directionalLight.shadow.bias =
    -0.0003;


// 그림자 범위
directionalLight.shadow.camera.left =
    -12;


directionalLight.shadow.camera.right =
    12;


directionalLight.shadow.camera.top =
    12;


directionalLight.shadow.camera.bottom =
    -12;


directionalLight.shadow.camera.near =
    0.5;


directionalLight.shadow.camera.far =
    30;


scene.add(
    directionalLight
);


// ==================================================
// 갤러리 크기
// ==================================================

const GALLERY_WIDTH =
    18;


const GALLERY_DEPTH =
    18;


// 천장 높이
const GALLERY_HEIGHT =
    8;


// ==================================================
// 나무 바닥
// ==================================================

const floorCanvas =
    document.createElement(
        "canvas"
    );


floorCanvas.width =
    1024;


floorCanvas.height =
    1024;


const floorContext =
    floorCanvas.getContext(
        "2d"
    );


// 바닥 기본 색
floorContext.fillStyle =
    "#766657";


floorContext.fillRect(
    0,
    0,
    1024,
    1024
);


// ==================================================
// 나무 판자 패턴
// ==================================================

const plankHeight =
    64;


for (
    let y = 0;
    y < 1024;
    y += plankHeight
) {

    const row =
        y / plankHeight;


    const offset =
        row % 2 === 0
            ? 0
            : -128;


    for (
        let x = offset;
        x < 1024;
        x += 256
    ) {

        const brightness =
            62 +
            Math.random() * 22;


        floorContext.fillStyle =
            `rgb(
                ${brightness + 18},
                ${brightness + 8},
                ${brightness}
            )`;


        floorContext.fillRect(

            x + 1,

            y + 1,

            254,

            plankHeight - 2

        );


        // 판자 경계
        floorContext.strokeStyle =
            "rgba(40,30,20,0.22)";


        floorContext.lineWidth =
            2;


        floorContext.strokeRect(

            x,

            y,

            256,

            plankHeight

        );


        // 약한 나뭇결
        for (
            let i = 0;
            i < 6;
            i++
        ) {

            floorContext.strokeStyle =
                "rgba(70,45,30,0.10)";


            floorContext.beginPath();


            const grainY =
                y +
                Math.random() *
                plankHeight;


            floorContext.moveTo(
                x,
                grainY
            );


            floorContext.lineTo(

                x + 256,

                grainY +
                    Math.random() * 5

            );


            floorContext.stroke();

        }

    }

}


// ==================================================
// 바닥 텍스처
// ==================================================

const floorTexture =
    new THREE.CanvasTexture(
        floorCanvas
    );


floorTexture.colorSpace =
    THREE.SRGBColorSpace;


floorTexture.wrapS =
    THREE.RepeatWrapping;


floorTexture.wrapT =
    THREE.RepeatWrapping;


floorTexture.repeat.set(
    2.2,
    2.2
);


// ==================================================
// 바닥 Mesh
// ==================================================

const floorGeometry =
    new THREE.PlaneGeometry(

        GALLERY_WIDTH,

        GALLERY_DEPTH

    );


const floorMaterial =
    new THREE.MeshStandardMaterial({

        map:
            floorTexture,

        roughness:
            0.68,

        metalness:
            0

    });


const floor =
    new THREE.Mesh(

        floorGeometry,

        floorMaterial

    );


floor.rotation.x =
    -Math.PI / 2;


floor.receiveShadow =
    true;


scene.add(
    floor
);


// ==================================================
// 벽 재질
// ==================================================

const wallMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0xeeeeeb,

        roughness:
            0.88,

        metalness:
            0

    });


// ==================================================
// 벽 생성 함수
// ==================================================

function createWall(

    x,

    y,

    z,

    width,

    height,

    depth

) {

    const geometry =
        new THREE.BoxGeometry(

            width,

            height,

            depth

        );


    const wall =
        new THREE.Mesh(

            geometry,

            wallMaterial

        );


    wall.position.set(

        x,

        y,

        z

    );


    wall.castShadow =
        true;


    wall.receiveShadow =
        true;


    scene.add(
        wall
    );


    return wall;

}


// ==================================================
// 외벽
// ==================================================


// 뒤쪽
createWall(

    0,

    GALLERY_HEIGHT / 2,

    -9,

    18,

    GALLERY_HEIGHT,

    0.18

);


// 왼쪽
createWall(

    -9,

    GALLERY_HEIGHT / 2,

    0,

    0.18,

    GALLERY_HEIGHT,

    18

);


// 오른쪽
createWall(

    9,

    GALLERY_HEIGHT / 2,

    0,

    0.18,

    GALLERY_HEIGHT,

    18

);


// ==================================================
// 중앙 메인 전시벽
// ==================================================

createWall(

    0,

    2.05,

    -4.6,

    8.6,

    4.1,

    0.24

);


// ==================================================
// 중앙벽 뒤 좌우 벽
// ==================================================

createWall(

    -6.75,

    2.05,

    -6.1,

    4.3,

    4.1,

    0.20

);


createWall(

    6.75,

    2.05,

    -6.1,

    4.3,

    4.1,

    0.20

);

const centerWallFloorShadow =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            8.2,
            0.45
        ),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.10,
            depthWrite: false
        })
    );

centerWallFloorShadow.rotation.x =
    -Math.PI / 2;

centerWallFloorShadow.position.set(
    0,
    0.012,
    -4.43
);

scene.add(
    centerWallFloorShadow
);

// ==================================================
// 중앙 벽 작품
// ==================================================

const artworkGroup =
    new THREE.Group();


// 액자
const artworkFrame =
    new THREE.Mesh(
        new THREE.BoxGeometry(
            1.75,
            3.15,
            0.08
        ),
        new THREE.MeshStandardMaterial({
            color: 0x161616,
            roughness: 0.65
        })
    );

artworkFrame.castShadow = true;

artworkGroup.add(
    artworkFrame
);


// 흰색 액자 안쪽
const artworkMat =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            1.62,
            3.02
        ),
        new THREE.MeshStandardMaterial({
            color: 0xf8f8f5,
            roughness: 0.9
        })
    );

artworkMat.position.z =
    0.045;

artworkGroup.add(
    artworkMat
);








































// // ==================================================
// // 작품 이미지 불러오기
// // ==================================================

// const artworkTexture =
//     new THREE.TextureLoader().load(
//         "./assets/artwork-blue.jpg"
//     );

// artworkTexture.colorSpace =
//     THREE.SRGBColorSpace;


// // 작품
// const artwork =
//     new THREE.Mesh(
//         new THREE.PlaneGeometry(
//             1.50,
//             2.90
//         ),
//         new THREE.MeshStandardMaterial({
//             map: artworkTexture,
//             roughness: 0.8,
//             metalness: 0
//         })
//     );

// artwork.position.z =
//     0.051;

// artworkGroup.add(
//     artwork
// );


// // ==================================================
// // 중앙 전시벽에 배치
// // ==================================================

// artworkGroup.position.set(
//     0,
//     2.05,
//     -4.455
// );

// scene.add(
//     artworkGroup
// );
// // ==================================================
// // 천장
// // ==================================================


// ==================================================
// 중앙 벽 작품 - 테두리 없이 이미지 그대로
// ==================================================

const artworkTexture =
    new THREE.TextureLoader().load(
        "./assets/artwork-blue.png"
    );

artworkTexture.colorSpace =
    THREE.SRGBColorSpace;

artworkTexture.anisotropy =
    renderer.capabilities.getMaxAnisotropy();


const artwork =
    new THREE.Mesh(

        new THREE.PlaneGeometry(
            1.50,   // 그림 가로 크기
            2.90    // 그림 세로 크기
        ),

        new THREE.MeshStandardMaterial({

            map:
                artworkTexture,

            roughness:
                0.8,

            metalness:
                0

        })

    );


// 중앙벽 바로 앞에 붙이기
artwork.position.set(

    0,          // 좌우
    2.05,       // 높이
    -4.455      // 벽 앞쪽

);

scene.add(
    artwork
);








































const ceilingGeometry =
    new THREE.PlaneGeometry(

        GALLERY_WIDTH,

        GALLERY_DEPTH

    );


const ceilingMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0xffffff,

        emissive:
            0xffffff,

        emissiveIntensity:
            0.8,

        roughness:
            0.82,

        metalness:
            0,

        side:
            THREE.DoubleSide

    });


const ceiling =
    new THREE.Mesh(

        ceilingGeometry,

        ceilingMaterial

    );


ceiling.rotation.x =
    Math.PI / 2;


ceiling.position.y =
    GALLERY_HEIGHT;


scene.add(
    ceiling
);


// ==================================================
// 천장 ↔ 벽 접촉 그림자
//
// 참고사진에서 벽과 천장이 붙는 곳에
// 얇은 회색 선이 보이는 느낌
// ==================================================

const contactShadowMaterial =
    new THREE.MeshBasicMaterial({

        color:
            0x777777,

        transparent:
            true,

        opacity:
            0.13,

        depthWrite:
            false

    });


// ==================================================
// 뒤쪽 벽 접촉 그림자
// ==================================================

const backCeilingShadow =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            18,

            0.035,

            0.06

        ),

        contactShadowMaterial

    );


backCeilingShadow.position.set(

    0,

    GALLERY_HEIGHT - 0.07,

    -8.88

);


scene.add(
    backCeilingShadow
);


// ==================================================
// 왼쪽 벽 접촉 그림자
// ==================================================

const leftCeilingShadow =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.06,

            0.035,

            18

        ),

        contactShadowMaterial

    );


leftCeilingShadow.position.set(

    -8.88,

    GALLERY_HEIGHT - 0.07,

    0

);


scene.add(
    leftCeilingShadow
);


// ==================================================
// 오른쪽 벽 접촉 그림자
// ==================================================

const rightCeilingShadow =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.06,

            0.035,

            18

        ),

        contactShadowMaterial

    );


rightCeilingShadow.position.set(

    8.88,

    GALLERY_HEIGHT - 0.07,

    0

);


scene.add(
    rightCeilingShadow
);


// ==================================================
// 천장 격자 프레임 재질
// ==================================================

const gridMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0xa8a8a5,

        roughness:
            0.82,

        metalness:
            0

    });


// ==================================================
// 격자 프레임 옆 가짜 접촉 그림자
// ==================================================

const gridShadowMaterial =
    new THREE.MeshBasicMaterial({

        color:
            0x777777,

        transparent:
            true,

        opacity:
            0.10,

        depthWrite:
            false

    });


// ==================================================
// X 방향 프레임
// ==================================================

for (

    let z = -9;

    z <= 9;

    z += 2.25

) {

    const geometry =
        new THREE.BoxGeometry(

            18,

            0.028,

            0.035

        );


    const beam =
        new THREE.Mesh(

            geometry,

            gridMaterial

        );


    beam.position.set(

        0,

        GALLERY_HEIGHT - 0.035,

        z

    );


    beam.castShadow =
        false;


    beam.receiveShadow =
        false;


    scene.add(
        beam
    );


    // ==============================================
    // 프레임 옆의 아주 얇은 그림자
    // ==============================================

    const shadow =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                18,

                0.006,

                0.09

            ),

            gridShadowMaterial

        );


    shadow.position.set(

        0,

        GALLERY_HEIGHT - 0.055,

        z + 0.035

    );


    scene.add(
        shadow
    );

}


// ==================================================
// Z 방향 프레임
// ==================================================

for (

    let x = -9;

    x <= 9;

    x += 2.25

) {

    const geometry =
        new THREE.BoxGeometry(

            0.035,

            0.028,

            18

        );


    const beam =
        new THREE.Mesh(

            geometry,

            gridMaterial

        );


    beam.position.set(

        x,

        GALLERY_HEIGHT - 0.035,

        0

    );


    beam.castShadow =
        false;


    beam.receiveShadow =
        false;


    scene.add(
        beam
    );


    // ==============================================
    // 프레임 옆 그림자
    // ==============================================

    const shadow =
        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.09,

                0.006,

                18

            ),

            gridShadowMaterial

        );


    shadow.position.set(

        x + 0.035,

        GALLERY_HEIGHT - 0.055,

        0

    );


    scene.add(
        shadow
    );

}


// ==================================================
// 넓은 천장 면광원
// ==================================================

const ceilingAreaLights = [

    [-4.5, -4.5],

    [0.0, -4.5],

    [4.5, -4.5],


    [-4.5, 0.0],

    [0.0, 0.0],

    [4.5, 0.0],


    [-4.5, 4.5],

    [0.0, 4.5],

    [4.5, 4.5]

];


for (
    const [x, z]
    of ceilingAreaLights
) {

    const light =
        new THREE.RectAreaLight(

            0xffffff,

            2.2,

            5.5,

            5.5

        );


    light.position.set(

        x,

        GALLERY_HEIGHT - 0.12,

        z

    );


    // 아래쪽을 향함
    light.rotation.x =
        -Math.PI / 2;


    scene.add(
        light
    );

}


// ==================================================
// 벤치
// ==================================================

const benchGroup =
    new THREE.Group();


const benchMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x272522,

        roughness:
            0.68

    });


// ==================================================
// 벤치 윗판
// ==================================================

const benchTop =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            4.5,

            0.22,

            1.05

        ),

        benchMaterial

    );


benchTop.position.y =
    0.72;


benchTop.castShadow =
    true;


benchTop.receiveShadow =
    true;


benchGroup.add(
    benchTop
);


// ==================================================
// 벤치 왼쪽 다리
// ==================================================

const benchLegLeft =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.28,

            0.7,

            0.85

        ),

        benchMaterial

    );


benchLegLeft.position.set(

    -1.8,

    0.35,

    0

);


benchLegLeft.castShadow =
    true;


benchGroup.add(
    benchLegLeft
);


// ==================================================
// 벤치 오른쪽 다리
// ==================================================

const benchLegRight =
    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.28,

            0.7,

            0.85

        ),

        benchMaterial

    );


benchLegRight.position.set(

    1.8,

    0.35,

    0

);


benchLegRight.castShadow =
    true;


benchGroup.add(
    benchLegRight
);


// 중앙 앞쪽
benchGroup.position.set(

    0,

    0,

    2.3

);


scene.add(
    benchGroup
);


// ==================================================
// 플레이어
// ==================================================

// ★ 여기 아래부터는
// 네 기존 main.js의
// const players = {};
// 부터 마지막 animate();
// 까지 그대로 두면 됨.

















































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

// function applyCrouchVisual(
//     player,
//     crouching,
//     immediate = false
// ) {

//     if (!player) {
//         return;
//     }

//     player.crouching = crouching;

//     player.targetScaleY =
//         crouching ? 0.5 : 1;

//     player.targetVisualY =
//         crouching ? -0.25 : 0;

//     if (immediate) {

//         player.visual.scale.y =
//             player.targetScaleY;

//         player.visual.position.y =
//             player.targetVisualY;

//     }
// }


// 여기부터 추가
function getPlayerHeight(player) {

    return player.crouching
        ? 0.5
        : 1.0;
}


function getPlayerBounds(player) {

    const bottom =
        player.root.position.y - 0.5;

    const height =
        getPlayerHeight(player);

    return {
        bottom: bottom,
        top: bottom + height
    };
}


function findStandingPlayer(player) {

    const myBottom =
        player.root.position.y - 0.5;

    for (const id in players) {

        if (id === myId) {
            continue;
        }

        const other =
            players[id];

        if (!other) {
            continue;
        }

        const otherBounds =
            getPlayerBounds(other);

        const overlapX =
            Math.abs(
                player.root.position.x -
                other.root.position.x
            ) < 0.95;

        const overlapZ =
            Math.abs(
                player.root.position.z -
                other.root.position.z
            ) < 0.95;

        if (
            overlapX &&
            overlapZ &&
            Math.abs(
                myBottom -
                otherBounds.top
            ) < 0.08
        ) {

            return other;
        }
    }

    return null;
}


function resolvePlayerCollisions(
    player,
    previousPosition
) {

    const myHalfWidth = 0.5;

    let landedOnPlayer = false;

    for (const id in players) {

        if (id === myId) {
            continue;
        }

        const other =
            players[id];

        if (!other) {
            continue;
        }

        const otherHalfWidth = 0.5;

        const myBounds =
            getPlayerBounds(player);

        const otherBounds =
            getPlayerBounds(other);

        const overlapX =
            Math.abs(
                player.root.position.x -
                other.root.position.x
            ) <
            myHalfWidth +
            otherHalfWidth;

        const overlapZ =
            Math.abs(
                player.root.position.z -
                other.root.position.z
            ) <
            myHalfWidth +
            otherHalfWidth;

        if (
            !overlapX ||
            !overlapZ
        ) {
            continue;
        }

        const previousBottom =
            previousPosition.y - 0.5;

        // 위에서 내려오면 머리 위 착지
        if (
            verticalVelocity <= 0 &&
            previousBottom >=
                otherBounds.top - 0.12 &&
            myBounds.bottom <=
                otherBounds.top
        ) {

            player.root.position.y =
                otherBounds.top + 0.5;

            verticalVelocity = 0;

            isGrounded = true;

            landedOnPlayer = true;

            continue;
        }


        const verticalOverlap =
            myBounds.top >
                otherBounds.bottom + 0.05 &&
            myBounds.bottom <
                otherBounds.top - 0.05;

        // if (verticalOverlap) {

        //     player.root.position.x =
        //         previousPosition.x;

        //     player.root.position.z =
        //         previousPosition.z;
        // }

        if (verticalOverlap) {

            const dx =
                player.root.position.x -
                other.root.position.x;

            const dz =
                player.root.position.z -
                other.root.position.z;


            let distance =
                Math.hypot(
                    dx,
                    dz
                );


            if (distance < 0.0001) {
                distance = 0.0001;
            }


            const normalX =
                dx / distance;

            const normalZ =
                dz / distance;


            const overlap =
                1.0 - distance;


            if (overlap > 0) {

                // =========================================
                // 내 캐릭터도 살짝 밀림
                // =========================================

                const selfPush =
                    0.25;


                player.root.position.x +=
                    normalX *
                    overlap *
                    selfPush;


                player.root.position.z +=
                    normalZ *
                    overlap *
                    selfPush;


                // =========================================
                // 상대 캐릭터도 밀기
                // =========================================

                const otherPush =
                    0.06;


                socket.emit(
                    "pushPlayer",
                    {

                        targetId:
                            id,

                        pushX:
                            -normalX *
                            otherPush,

                        pushZ:
                            -normalZ *
                            otherPush

                    }
                );
            }
        }
    }


    if (
        isGrounded &&
        player.root.position.y >
            groundPlayerY + 0.05 &&
        !landedOnPlayer
    ) {

        const support =
            findStandingPlayer(player);

        if (support) {

            const supportBounds =
                getPlayerBounds(support);

            player.root.position.y =
                supportBounds.top + 0.5;

        } else {

            isGrounded = false;
        }
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
// 서버에서 플레이어 밀림 수신
// ==================================================

socket.on(
    "playerPushed",
    (data) => {

        const player =
            players[data.id];

        if (!player) {
            return;
        }


        player.root.position.x =
            data.x;

        player.root.position.z =
            data.z;

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
    const previousPosition =
        player.root.position.clone();

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

    resolvePlayerCollisions(
        player,
        previousPosition
    );
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