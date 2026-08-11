const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

// const io = new Server(server);
const io = new Server(server, {
    cors: {
        origin: "https://beamish-palmier-9359d7.netlify.app",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;


// ================================
// public 폴더
// ================================

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ================================
// 플레이어 데이터
// ================================

const players = {};


// ================================
// Socket.IO
// ================================

io.on("connection", (socket) => {

    console.log(
        "플레이어 접속:",
        socket.id
    );


    // ================================
    // 새로운 플레이어
    // ================================

    players[socket.id] = {

        id: socket.id,

        x: Math.random() * 10 - 5,

        y: 0.5,

        z: Math.random() * 10 - 5,

        rotation: 0,

        // 웅크리기 상태
        crouching: false

    };


    // ================================
    // 새 접속자에게
    // 현재 플레이어 전부 전달
    // ================================

    socket.emit(
        "currentPlayers",
        players
    );


    // ================================
    // 기존 사람들에게
    // 새 플레이어 알림
    // ================================

    socket.broadcast.emit(
        "newPlayer",
        players[socket.id]
    );


    // ================================
    // 플레이어 상태 수신
    // ================================

    socket.on(
        "playerMove",
        (data) => {

            const player =
                players[socket.id];

            if (!player) {
                return;
            }


            // 위치
            player.x = data.x;
            player.y = data.y;
            player.z = data.z;


            // 방향
            player.rotation =
                data.rotation;


            // 웅크리기
            player.crouching =
                Boolean(data.crouching);


            // ================================
            // 다른 플레이어에게 전달
            // ================================

            socket.broadcast.emit(
                "playerMoved",
                {

                    id: socket.id,

                    x: player.x,
                    y: player.y,
                    z: player.z,

                    rotation:
                        player.rotation,

                    crouching:
                        player.crouching

                }
            );

        }
    );
    socket.on(
        "pushPlayer",
        (data) => {

            const target =
                players[data.targetId];

            if (!target) {
                return;
            }


            const pushX =
                Number(data.pushX) || 0;

            const pushZ =
                Number(data.pushZ) || 0;


            // 너무 강한 값 방지
            const maxPush =
                0.08;


            const safePushX =
                Math.max(
                    -maxPush,
                    Math.min(
                        maxPush,
                        pushX
                    )
                );


            const safePushZ =
                Math.max(
                    -maxPush,
                    Math.min(
                        maxPush,
                        pushZ
                    )
                );


            target.x +=
                safePushX;

            target.z +=
                safePushZ;


            io.emit(
                "playerPushed",
                {

                    id:
                        data.targetId,

                    x:
                        target.x,

                    z:
                        target.z

                }
            );

        }
    );


    // ================================
    // 접속 종료
    // ================================

    socket.on(
        "disconnect",
        () => {

            console.log(
                "플레이어 퇴장:",
                socket.id
            );


            delete players[
                socket.id
            ];


            io.emit(
                "playerDisconnected",
                socket.id
            );

        }
    );

});


// ================================
// 서버 실행
// ================================

// server.listen(
//     PORT,
//     () => {

//         console.log(
//             `서버 실행 중: http://localhost:${PORT}`
//         );

//     }
// );




server.listen(PORT, "0.0.0.0", () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});