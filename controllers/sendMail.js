const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
let {GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL, GOOGLE_REFRESH, GOOGLE_USER} = process.env;

const sendMail => async (mail, code){
	const client = new OAuth2(
		GOOGLE_ID,
		GOOGLE_SECRET,
		GOOGLE_URL
	);

	client.setCredentials({
		refresh_token: GOOGLE_REFRESH
	});

	const accessToken = client.getAccessToken();

	const transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: GOOGLE_USER,
			type: 'OAuth2',
			clientID: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET,
			refresh_token: GOOGLE_REFRESH,
			accessToken: accessToken
		},

		tls: {
			rejectUnauthorized: false
		}
	})

	const mailOptions = {
		from: GOOGLE_USER,
		to: mail,
		subject: 'Código de verificación de Terra Farms Market',
		html: 
				`<div>
					<h1>Hola, ${mail}</h1>
					<p>We need to verify your email account, please follow the link below</p>
					<p></p>
				</div>`
	}

	await transport.sendMail(mailOptions, (error, response) => {
		if (error) {
			console.log(error);
		} else {
			console.log('Mail sent correctly');
			console.log(response);
		}
	})
}

module.exports = sendMail;