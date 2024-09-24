import { $ } from '@wdio/globals';
import Page from '../page';  // relatif ke folder

export class LoginPage extends Page {
    // Menggunakan getter untuk element selection
    public get usernameDisplay() {
        return $('//*[@data-testid="page-header-title"]');  // Sesuaikan selector-nya
    }

    public get btnLoginWithGoogle() {
        return $('//span[contains(text(),"Login dengan Google")]');
    }

    public get mailbox() {
        return $('//input[@type="email" and @aria-label="Email or phone"]');
    }

    public get btnNext() {
        return $('//span[contains(text(), "Next")]');
    }

    public get passbox() {
        return $('//input[@type="password" and @aria-label="Enter your password"]');
    }

    public get greetingsText() {
        return $('html/body/div[1]/section/section/main/div/div/div/div[1]/div[1]/div/div[1]/div[1]/div/section/span');
    }

    // Method untuk membuka halaman login
    public open() {
        return super.open('login');
    }
}

export default new LoginPage();
