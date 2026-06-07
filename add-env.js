const { execSync } = require('child_process');

const envVars = {
  DATABASE_URL: "postgresql://sringarika_user:VkXt1IieEw7auUnwLWASAZYyYNd2d0M3@dpg-d8hurkm7r5hc73cbbr80-a.oregon-postgres.render.com/sringarika?sslmode=require",
  NEXTAUTH_SECRET: "sringarika_secret_key_1234567890!@#",
  NEXTAUTH_URL: "https://tantuleela-coder-vedanshs-projects.vercel.app",
};

for (const [key, value] of Object.entries(envVars)) {
  try {
    console.log(`Adding ${key}...`);
    // Using string interpolation for powershell to pipe string directly
    execSync(`vercel env add ${key} production`, {
      input: value,
      stdio: ['pipe', 'inherit', 'inherit']
    });
  } catch (err) {
    console.error(`Failed to add ${key}: ${err.message}`);
  }
}
console.log("Done adding env variables.");
