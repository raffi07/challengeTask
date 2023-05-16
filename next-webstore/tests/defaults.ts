export const defaults = {
  testTime: process.env.NEXT_PUBLIC_NODE_ENV === "production" || "test"
  ? 60000: 45000,
  waitTime: process.env.NEXT_PUBLIC_NODE_ENV === "production" || "test"
  ? 10000: 5000,
  testUser:
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? { email: "jane@example.com", password: "password2" }
      : {
          email: "staging-sam@example.com",
          password: "staging-password1",
        },
  pageUrl:
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? "https://next-danube-webshop.vercel.app"
      : process.env.NEXT_PUBLIC_NODE_ENV === "test"
      ? "https://next-danube-webshop-staging.vercel.app"
      : "http://localhost:3000",

  apiUrl:
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? "https://next-danube-webshop-backend.vercel.app/api/v1"
      : "https://next-danube-webshop-backend-staging.vercel.app/api/v1",
};
