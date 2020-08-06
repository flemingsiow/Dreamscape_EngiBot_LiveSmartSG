// Load the AWS SDK for Node.js
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-sending-sms.html


publish_to_handphone = (handphonenumber, message) => {
    try {
        var AWS = require('aws-sdk');
        // Set region
        AWS.config.update({region: 'ap-southeast-1'});

        console.log(`HP: ${handphonenumber} MSG: ${message}`)
        console.log(`HP: ${typeof(handphonenumber)} MSG: ${typeof(message)}`)

        var params = {
            Message:  message.toString(),
            PhoneNumber: handphonenumber.toString(),
        };

        var sns = new AWS.SNS({apiVersion: '2010-03-31'})

        sns.setSMSAttributes({
            attributes:{
                MonthlySpendLimit: "15", //Change to something u use
                DefaultSenderID: "acraflemingsiow",
                DefaultSMSType: "Transactional" 
            }
        });
        // Create promise and SNS service object
        var publishTextPromise = sns.publish(params).promise();

        // Handle promise's fulfilled/rejected states
        publishTextPromise.then(
            function(data) {
                console.log(data);
                console.log("MessageID is " + data.MessageId);
                return {"success": true, "result": data};
            }).catch(
            function(err) {
                console.log("Error sending SMS " + err.message)
                return {"success": false, "result": err};
                //console.error(err, err.stack);
        });
    }
    catch(err) {
        console.log(err.message);
    }
    
} //end of method

module.exports = {publish_to_handphone}