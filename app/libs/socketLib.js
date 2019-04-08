const socketio = require('socket.io');
const mongoose = require('mongoose');

const shortid = require('shortid');
const token = require('./tokenLib');
const list = require('./list');
const logger = require('./loggerLib');

const events = require('events');
const eventEmitter = new events.EventEmitter();


let setServer = (server) => {
    let allOnlineUsers = [];
    let IO = socketio.listen(server);
    let myIO = IO.of('');
    let allUsersOnIssue = [];
    
    myIO.on('connection', (socket) => {
        let currentUser;

        socket.emit('verify-user', '');

        socket.on('set-user', (authToken) => {
            token.verifyWithoutSecret(authToken, (err, result) => {
                console.log("setting user...")
                if(err) {
                    socket.emit('auth-error', {status: 500, message: "Please provide correct auth details"});
                } else {
                    socket.userId = result.userId;
                    currentUser = {
                        userId: result.userId,
                        fullName: result.fullName,
                        email: result.email,
                        mobileNumber: result.mobileNumber
                    }
                    
                    allOnlineUsers.push(currentUser);
                    // console.log(allOnlineUsers);
                    // socket.emit(currentUser.userId, "You're online");

                    //Broadcasting
                    socket.room = 'notification';
                    socket.join(socket.room);
                    socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);

                }
            });
        });//end of set-user event


        //NOTIFICATIONS

        socket.on('issue-updated', (issueId) => {

            socket.to(socket.room).broadcast.emit('issue-updated-notification', { issueId: issueId, fullName: currentUser.fullName });
        });

        // comment added notification
        socket.on('comment-added', (issueId) => {
            emitData = {
                issueId: issueId,
                message: `${currentUser.fullName} has commented on this issue`,
                action: "VIEW"
            }
            list.getAllUsers(issueId, (err, result) => {
                if(err) {
                    for(userId of err) {
                        myIO.emit(userId, emitData);
                    }
                } else {
                    for (userId of result) {
                        myIO.emit(userId, emitData);
                    }
                }
            });

        });

        // comment removed notification
        socket.on('comment-removed', (issueId) => {
            emitData = {
                issueId: issueId,
                message: `${currentUser.fullName} has removed their commented on this issue`,
                action: "VIEW"
            }
            list.getAllUsers(issueId, (err, result) => {
                if (err) {
                    for (userId of err) {
                        myIO.emit(userId, emitData);
                    }
                } else {
                    for (userId of result) {
                        myIO.emit(userId, emitData);
                    }
                }
            });
        });

        //assignee added notification
        socket.on('assignee-added', (issueId) => {
            emitData = {
                issueId: issueId,
                message: `${currentUser.fullName} has assigned a new person on this issue`,
                action: "VIEW"
            }
            list.getAllUsers(issueId, (err, result) => {
                if (err) {
                    for (userId of err) {
                        myIO.emit(userId, emitData);
                    }
                } else {
                    for (userId of result) {
                        myIO.emit(userId, emitData);
                    }
                }
            });
        });

        //assignee removed notification
        socket.on('assignee-removed', (issueId) => {
            emitData = {
                issueId: issueId,
                message: `${currentUser.fullName} has removed an assignee from this issue`,
                action: "VIEW"
            }
            list.getAllUsers(issueId, (err, result) => {
                if (err) {
                    for (userId of err) {
                        myIO.emit(userId, emitData);
                    }
                } else {
                    for (userId of result) {
                        myIO.emit(userId, emitData);
                    }
                }
            });
        });

        //watcher added notification
        socket.on('watcher-added', (issueId) => {
            emitData = {
                issueId: issueId,
                message: `${currentUser.fullName} has added himself to Watchlist on this issue`,
                action: "VIEW"
            }
            list.getAllUsers(issueId, (err, result) => {
                if (err) {
                    for (userId of err) {
                        myIO.emit(userId, emitData);
                    }
                } else {
                    for (userId of result) {
                        myIO.emit(userId, emitData);
                    }
                }
            });
        });



        socket.on('disconnect', () => {
            let removeIndex = allOnlineUsers.map((user) => {return user.userId}).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex, 1);

            //refreshing and emitting new online users list
            socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);
            socket.leave(socket.room);

        });//end of disconnect event

    });
}

module.exports = {
    setServer: setServer
};