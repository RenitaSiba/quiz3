class resetPasswordPage{
    visitPage(){
        cy.contains('Forgot your password?').click()
    }
    assertionResetPage(){
        cy.url().should('include', '/auth/requestPasswordResetCode')
        cy.contains('Reset Password').should('be.visible')
    }
    inputUsername(){
        cy.get('[name="username"').type('adadeh')
    }
    clickResetPassword(){
        cy.get('button[type="submit"]').click()
    }
    assertionResetMessages(){
        cy.url().should('include', '/auth/sendPasswordReset')
        cy.contains('Reset Password link sent successfully').should('be.visible')
    }
    interceptRequestPasswordAPI(){
        cy.intercept('POST','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestResetPassword' ).as('requestPassword');
    }
    verifyRequestPasswordAPI(){
        cy.wait('@requestPassword').then((interception)=>{
            expect(interception.request.method).to.eq('POST')
            expect(interception.response.statusCode).to.eq(302)
        })
    }
    clickCancel(){
        cy.get('button[type="button"]').click()
    }
    interceptLoginAPI(){
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').as('CancelReq');        
    }
    verifyLoginAPI(){
        cy.wait('@CancelReq').then((interception)=>{
            expect(interception.request.method).to.eq('GET')
            expect(interception.response.statusCode).to.eq(200)
        })
    }
    
}
export default new resetPasswordPage