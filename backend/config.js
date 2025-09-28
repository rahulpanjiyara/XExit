// module.exports = {
//   PORT: 8080,
//   MONGO_URI:
//     "mongodb+srv://rahulpanjiyara_db_user:XJmU1nW8dEYcT7vr@cluster0.7w7diz9.mongodb.net/xexit?retryWrites=true&w=majority&appName=Cluster0",
//   JWT_SECRET: "933f04a23e00d44276153e79585d7585",
//   CALENDARIFIC_API_KEY: "ijCypNfpAXheHoZQNIwgTyK2sFb9LIf8",
//   EMAIL_USER: "your_email@gmail.com",
//   EMAIL_PASS: "your_email_app_password",
// };

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CALENDARIFIC_API_KEY: process.env.CALENDARIFIC_API_KEY,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
