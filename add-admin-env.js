const { execSync } = require('child_process');

const envVars = {
  ADMIN_EMAIL: "sringarika0001@gmail.com",
  ADMIN_PASSWORD: "Pallavi0001@sringarika",
};

for (const [key, value] of Object.entries(envVars)) {
  try {
    console.log(`Adding ${key}...`);
    execSync(`vercel env add ${key} production`, {
      input: value,
      stdio: ['pipe', 'inherit', 'inherit']
    });
  } catch (err) {
    console.error(`Failed to add ${key}: ${err.message}`);
  }
}
console.log("Done adding env variables.");
