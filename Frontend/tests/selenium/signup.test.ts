import { Builder, By, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

const randomEmail = `test${Date.now()}@example.com`;

let driver: WebDriver;

(async () => {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
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

    // Optional: wait for redirection, toast, or dashboard
    await driver.sleep(3000); // or use explicit wait if you have one

    console.log("✅ Signup test passed with:", randomEmail);
  } catch (err) {
    console.error("❌ Signup test failed:", err);
  } finally {
    await driver.quit();
  }
})();
