const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REFRESH, GOOGLE_URL, GOOGLE_USER } = process.env


const sendMail = async (mail, code) => {

	const client = new OAuth2(
		GOOGLE_ID,
		GOOGLE_SECRET,
		GOOGLE_URL,
	);

	client.setCredentials({
		refresh_token: GOOGLE_REFRESH
	});

	const accesToken = client.getAccessToken();

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: GOOGLE_USER,
			type: 'OAuth2',
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET,
			refreshToken: GOOGLE_REFRESH,
			accesToken: accesToken
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	const mailOpcions = {
		from: GOOGLE_USER,
		to: mail,
		subject: 'Verification code for Terra Farms Market',
		html: `
        <div>
			<h1>Hi!, ${mail}</h1>
			<p>We need to verify your email account, please follow the link below</p>
			<a href='http://localhost:4000/auth/verify/${code}'>Click to verify</a>
        </div>
    `
	}

	transport.sendMail(mailOpcions, (err, res) => {
		if (err) {
			console.log(err)
		} else {
			console.log('Mail sent correctly')
		}
	})
}

module.exports = sendMail;