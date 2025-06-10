import { Builder, By, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

let driver: WebDriver;

(async () => {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    await driver.get("http://localhost:5173");

    // Wait for the email field to be available
    const emailInput = await driver.wait(
      until.elementLocated(By.css('input[placeholder="you@example.com"]')),
      10000
    );
    await emailInput.sendKeys("test1749590116445@example.com");

    // Password
    const passwordInput = await driver.findElement(By.css('input[placeholder="••••••••"]'));
    await passwordInput.sendKeys("password123");

    // Submit
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
    await submitBtn.click();

    // Optionally wait for some response or navigation
    await driver.sleep(3000); // Adjust or replace with a more precise wait

    console.log("✅ Login test passed");
  } catch (err) {
    console.error("❌ Login test failed:", err);
  } finally {
    await driver.quit();
  }
})();
