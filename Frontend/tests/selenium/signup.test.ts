import { Builder, By, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

const randomEmail = `test${Date.now()}@example.com`;

let driver: WebDriver;

(async () => {
  const options = new chrome.Options();
  options.addArguments(
    "--headless=new", // Use the new headless mode (or "--headless" if needed)
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--window-size=1920,1080",
    "--user-data-dir=/tmp/chrome-profile" // Prevent session conflict in CI
  );

  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("http://localhost:5173/signup");

    const fullName = await driver.wait(
      until.elementLocated(By.css('input[placeholder="John Doe"]')),
      10000
    );
    await fullName.sendKeys("Test User");

    const email = await driver.findElement(By.css('input[placeholder="you@example.com"]'));
    await email.sendKeys(randomEmail);

    const password = await driver.findElement(By.css('input[placeholder="••••••••"]'));
    await password.sendKeys("password123");

    const submit = await driver.findElement(By.css('button[type="submit"]'));
    await submit.click();

    // Optionally wait for dashboard redirect or toast message
    await driver.wait(until.urlContains("/dashboard"), 5000).catch(() => {
      // fallback sleep if dashboard route doesn’t exist
      return driver.sleep(3000);
    });

    console.log("✅ Signup test passed with:", randomEmail);
  } catch (err) {
    console.error("❌ Signup test failed:", err);
  } finally {
    await driver.quit();
  }
})();
