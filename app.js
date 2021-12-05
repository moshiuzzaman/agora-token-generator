const cors = require('cors')
const express = require("express");
const app = express();
const {
    RtmTokenBuilder,
    RtmRole,
    RtcTokenBuilder,
    RtcRole,
} = require("agora-access-token");

let appID='9726a69c2bd448108598e9e5a3d7e0d4'
let appCertificate='e2338cb1140743139e016290f66e7bc4'
app.use(cors()); 
app.get("/", (req, res) => {
    res.sendStatus(200);
});
const generateRtmToken = (account) => {

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    return RtmTokenBuilder.buildToken(
        appID,
        appCertificate,
        account,
        RtmRole,
        privilegeExpiredTs
    );
};

const generateRtcToken = (account, channelName = "testChannel") => {
console.log(channelName,account);
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    return RtcTokenBuilder.buildTokenWithAccount(
        appID,
        appCertificate,
        channelName,
        account,
        RtcRole,
        privilegeExpiredTs
    );
};

const generateRtcUidToken = (uid='12345654321', channelName = "test") => {

console.log(channelName,uid);
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const rtcUidToken = RtcTokenBuilder.buildTokenWithUid(
        appID,
        appCertificate,
        channelName,
        RtcRole,
        privilegeExpiredTs
    );

    return rtcUidToken;
};

app.get("/rtc-uid-token", (req, res) => {
    console.log('rtcUid');
    const uid = req.query.uid;
    const channelName = req.query.channelName;
    const rtcUidToken = generateRtcUidToken(uid, channelName);
    res.status(200).json({ token: rtcUidToken,uid:uid });
});
app.get("/rtm-token", (req, res) => {
    console.log('rtmToken');
    const account = req.query.username;
    const rtmToken = generateRtmToken(account);
    res.status(200).json({ token: rtmToken });
});
app.get("/rtc-token", (req, res) => {
    console.log('onlyrtc' );
    const account = '';
    const channelName = req.query.channelName;
    const rtcToken = generateRtcToken(account, channelName);
    res.status(200).json({ token: rtcToken });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
