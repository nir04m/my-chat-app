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

    // Wait for a heading element to appear
    const heading = await driver.wait(
      until.elementLocated(By.css("h1")),
      10000
    );

    const text = await heading.getText();
    console.log("Heading text is:", text);

    // Example: check login form
    // await driver.findElement(By.name("email")).sendKeys("test@example.com");
    // await driver.findElement(By.name("password")).sendKeys("123456");
    // await driver.findElement(By.css("button[type='submit']")).click();
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await driver.quit();
  }
})();
