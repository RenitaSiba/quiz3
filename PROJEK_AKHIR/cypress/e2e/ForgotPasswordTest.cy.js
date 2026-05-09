import loginPage from "../support/pageObjects/loginPage.js"
import resetPasswordPage from "../support/pageObjects/resetPage.js"

describe('Test Feature Forgot Password', () =>{
    beforeEach(()=>{
        loginPage.visitPage()
    })
    it('TC011-Halaman Forgot Password Berfungsi', () =>{
        resetPasswordPage.visitPage()
        resetPasswordPage.assertionResetPage()
    })
    it('TC012-Reset Password Success', () =>{
        resetPasswordPage.visitPage()
        resetPasswordPage.inputUsername()
        resetPasswordPage.interceptRequestPasswordAPI()
        resetPasswordPage.clickResetPassword()
        resetPasswordPage.verifyRequestPasswordAPI()
        resetPasswordPage.assertionResetMessages()

    })
    it('TC013-Cancel Button Berfungsi',() =>{
        resetPasswordPage.visitPage()
        resetPasswordPage.interceptLoginAPI()
        resetPasswordPage.clickCancel()
        resetPasswordPage.verifyLoginAPI()

    })
})