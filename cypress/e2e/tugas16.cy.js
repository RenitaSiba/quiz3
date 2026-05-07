describe('Test Feature Login OrangeHRM', () => {
    beforeEach(() =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    })
    it('TC001-Login gagal dengan data kosong', () => {
        cy.get('button[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })
    it('TC002-Login gagal dengan password kosong', () =>{
        cy.get('[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })
    it('TC003-Login gagal dengan username kosong', () =>{
        cy.get('[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })
    it('TC004-Login dengan username valid dan password valid',() =>{
        cy.get('[name="username"]').type('Admin').should('have.value', 'Admin')
        cy.get('[name="password"]').type('admin123')
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummary');
        cy.get('button[type="submit"]').click()
        cy.wait('@actionsummary').its('response.statusCode').should('eq',200)
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })
    it('TC005-Login dengan username salah dan password valid',() =>{
        cy.get('[name="username"]').type('renita')
        cy.get('[name="password"]').type('admin123')
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginReq');
        cy.get('button[type="submit"]').click()
        cy.wait('@LoginReq').its('response.statusCode').should('eq',302)
        cy.contains('Invalid credentials').should('be.visible')
    })
    it('TC006-Login dengan username valid dan password salah',() =>{
        cy.get('[name="username"]').type('Admin').should('have.value', 'Admin')
        cy.get('[name="password"]').type('renita')
        cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('LoginReq');
        cy.get('button[type="submit"]').click()
        cy.wait('@LoginReq').its('request.method').should('eq','POST')
        cy.contains('Invalid credentials').should('be.visible')
    })
    //Login tetap berhasil, sistem tidak membedakan huruf besar dan kecil terhadap username
    //akan tetapi berbeda untuk password yang case sensitive
    it('TC007-Username tidak case sensitif',() =>{
        cy.get('[name="username"]').type('admin').should('have.value', 'admin')
        cy.get('[name="password"]').type('admin123')
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummary');
        cy.get('button[type="submit"]').click()
        cy.wait('@actionsummary').its('response.statusCode').should('eq',200)
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })

    it('TC008-Button Forgot your password? berfungsi',() =>{
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('ResetCode');
        cy.contains('Forgot your password?').click()
        cy.wait('@ResetCode').its('response.statusCode').should('eq',200)
        cy.url().should('include', 'auth/requestPasswordResetCode')
        cy.contains('Reset Password').should('be.visible')
    })
    it('TC009-Button Login harus terlihat dapat diklik',() =>{
        cy.get('button[type="submit"]').should('be.visible')
        cy.get('button[type="submit"]').should('be.enabled')
    })
    it('TC010-Icon OrangeHRM harus terlihat',() =>{
        cy.get('.orangehrm-login-branding').should('be.visible')
    })

})

