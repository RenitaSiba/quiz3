describe('Test Feature Login OrangeHRM', () => {
    beforeEach(() =>{
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    })
    it('TC001-Login gagal dengan data kosong', () => {
        cy.get('button[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })
    it('TC002-Login gagal dengan password kosong', () =>{
        cy.get('input[placeholder="Username"]').type('Admin')
        cy.get('button[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })
    it('TC003-Login gagal dengan username kosong', () =>{
        cy.get('input[placeholder="Password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })
    it('TC004-Login dengan username valid dan password valid',() =>{
        cy.get('input[placeholder="Username"]').type('Admin').should('have.value', 'Admin')
        cy.get('input[placeholder="Password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
    })
    it('TC005-Login dengan username salah dan password valid',() =>{
        cy.get('input[placeholder="Username"]').type('renita')
        cy.get('input[placeholder="Password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.contains('Invalid credentials').should('be.visible')
    })
    it('TC006-Login dengan username valid dan password salah',() =>{
        cy.get('input[placeholder="Username"]').type('Admin').should('have.value', 'Admin')
        cy.get('input[placeholder="Password"]').type('renita')
        cy.get('button[type="submit"]').click()
        cy.contains('Invalid credentials').should('be.visible')
    })
    it('TC007-Button Forgot your password? berfungsi',() =>{
        cy.contains('Forgot your password?').click()
        cy.url().should('include', 'auth/requestPasswordResetCode')
        cy.contains('Reset Password').should('be.visible')
    })
    it('TC008-Button Login harus terlihat dapat diklik',() =>{
        cy.get('button[type="submit"]').should('be.visible')
        cy.get('button[type="submit"]').should('be.enabled')
    })
    it('TC009-Icon OrangeHRM harus terlihat',() =>{
        cy.get('.orangehrm-login-branding').should('be.visible')
    })

})

