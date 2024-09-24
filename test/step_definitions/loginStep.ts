import { Given, When, Then } from '@cucumber/cucumber';
import LoginPage from '../pageobjects/authentications/loginPage';  // Import default

Given('I send login url', async () => {
    await browser.url('');
    await browser.maximizeWindow();
    await browser.takeScreenshot();
});

When('I login with credential', async() => {
    let btnlog = false;
    let maxAttempts = 1;

    do {
        try {

// Click google button
            await LoginPage.btnLoginWithGoogle.click();
            btnlog = true;
        } catch (e) {
            const error = e as Error; 
            console.error('Error clicking button:', error.message);

            await new Promise(resolve => setTimeout(resolve, 7000)); 

            maxAttempts--;
            if (maxAttempts === 0) {
                console.error('Maximum attempts reached. Reloading the page.');
                await browser.refresh();
                maxAttempts = 1;
            }
        }
    } while (!btnlog);

// Switch to Google login window
    const parentHandle = await browser.getWindowHandle();
    const childHandles = await browser.getWindowHandles();

    for (const handle of childHandles) {
        if (handle !== parentHandle) {
            await browser.switchToWindow(handle);
            console.log(`Switched to window with title: ${await browser.getTitle()}`);
            break;
        }
    }

// Handle potential iframe situation
    const iframes = await $$('iframe');
    if (await iframes.length > 0) {
        await browser.switchToFrame(iframes[0]);
        console.log('Switched to iframe containing the email input');
    }

    try {

// Input email
        await LoginPage.mailbox.setValue('');

// Click next            
        await LoginPage.btnNext.click();
    } catch (e) {
        const error = e as Error;
        console.error('Error interacting with email input:', error.message);
        throw error; 
    }

// Input password
    await LoginPage.passbox.setValue('');

// Click next        
    await LoginPage.btnNext.click();
    await browser.pause(3000);

// Switch back to the original window
    await browser.switchToWindow(parentHandle);
    await browser.pause(3000);
})

Then('I see usernameDisplay', async() => {
    await expect(LoginPage.usernameDisplay).toBeExisting();  // Cek keberadaan elemen
    const title = await LoginPage.usernameDisplay.getText();  // Ambil teks dari elemen
    await browser.pause(5000);
    console.log(title);
});
