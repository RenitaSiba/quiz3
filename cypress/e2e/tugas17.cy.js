import loginPage from "../../cypress/support/pageObjects/loginPage.js"
import loginData from "../../cypress/fixtures/loginData.json"

describe('Test Feature Login OrangeHRM', () => {
    beforeEach(() =>{
        loginPage.visitPage()
    })
    it('TC001-Login gagal dengan data kosong', () => {
        loginPage.clickLogin()
        loginPage.assertionRequired()
    })
    it('TC002-Login gagal dengan password kosong', () =>{
        loginPage.inputUsername(loginData.validUsername)
        loginPage.clickLogin()
        loginPage.assertionRequired()
    })
    it('TC003-Login gagal dengan username kosong', () =>{
        loginPage.inputPassword(loginData.validPassword)
        loginPage.clickLogin()
        loginPage.assertionRequired()
    })
    it('TC004-Login dengan username valid dan password valid',() =>{
        loginPage.inputUsername(loginData.validUsername)
        loginPage.inputPassword(loginData.validPassword)
        loginPage.interceptDashboardAPI()
        loginPage.clickLogin()
        loginPage.verifyDashboardAPI()
        loginPage.assertionLogin()
    })
    it('TC005-Login dengan username salah dan password valid',() =>{
        loginPage.inputUsername(loginData.invalidUsername)
        loginPage.inputPassword(loginData.validPassword)
        loginPage.interceptLoginAPI()
        loginPage.clickLogin()
        loginPage.verifyLoginAPI()
        loginPage.assertionInvalidLogin()    
    })
    it('TC006-Login dengan username valid dan password salah',() =>{
        loginPage.inputUsername(loginData.invalidPassword)
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.interceptLoginAPI()
        loginPage.clickLogin()
        loginPage.verifyLoginAPI()
        loginPage.assertionInvalidLogin()  
    })
    //Login tetap berhasil, sistem tidak membedakan huruf besar dan kecil terhadap username
    //akan tetapi berbeda untuk password yang case sensitive
    it('TC007-Username tidak case sensitif',() =>{
        loginPage.inputUsername(loginData.caseSensitiveUsername)
        loginPage.inputPassword(loginData.validPassword)
        loginPage.interceptDashboardAPI()
        loginPage.clickLogin()
        loginPage.verifyDashboardAPI()
        loginPage.assertionLogin()
    })

    it('TC008-Button Forgot your password? berfungsi',() =>{
        loginPage.interceptForgotPassword()
        loginPage.clickForgotPassword()
        loginPage.assertionForgotPassword()
        loginPage.assertionForgotPassword()
    })
    it('TC009-Button Login harus terlihat dapat diklik',() =>{
        loginPage.verifyBtnLogin()
    })
    it('TC010-Icon OrangeHRM harus terlihat',() =>{
        loginPage.verifyLogo()
    })

})

