class loginPage{
    visitPage(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    inputUsername(username){
       cy.get('[name="username"]').type(username) 
    }
    inputPassword(password){
        cy.get('[name="password"]').type(password)
    }
    clickLogin(){
        cy.get('button[type="submit"]').click()
 
    }
    loginSuccess(){
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    }
    assertionRequired(){
        cy.contains('Required').should('be.visible')
    }
    assertionInvalidLogin(){
        cy.contains('Invalid credentials').should('be.visible')
    }
    interceptLoginAPI(){
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginReq');        
    }
    verifyLoginAPI(){
        cy.wait('@LoginReq').then((interception)=>{
            expect(interception.request.method).to.eq('POST')
            expect(interception.response.statusCode).to.eq(302)
        })
    }
    interceptDashboardAPI(){
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummary');
    }
    verifyDashboardAPI(){
        cy.wait('@actionsummary').its('response.statusCode').should('eq',200)
    }
    assertionLogin(){
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    }
    interceptForgotPassword(){
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('ResetCode');
    }
    verifyForgotPasswordAPI(){
      cy.wait('@ResetCode').its('response.statusCode').should('eq',200)  
    }
    assertionForgotPassword(){
        cy.url().should('include', 'auth/requestPasswordResetCode')
        cy.contains('Reset Password').should('be.visible')
    }
    clickForgotPassword(){
        cy.contains('Forgot your password?').click()
    }
    verifyBtnLogin(){
        cy.get('button[type="submit"]').should('be.visible')
        cy.get('button[type="submit"]').should('be.enabled')
    }
    verifyLogo(){
        cy.get('.orangehrm-login-branding').should('be.visible')
    }

}
export default new loginPage()