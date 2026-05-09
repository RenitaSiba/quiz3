class directoryPage{
    //visitpage
    visitDashboardPage(){
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
    }
    clickDirectoryMenu(){
        cy.contains('Directory').click()
    }

    interceptDirectoryMenuAPI(){
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory' ).as('viewDirectory');
    }
    verifyDirectoryMenuApi(){
        cy.wait('@viewDirectory').then((interception)=>{
            expect(interception.request.method).to.eq('GET')
            expect(interception.response.statusCode).to.eq(200)
        })       
    }
    assertionDirectoryMenu(){
        cy.contains('Directory').should('be.visible')
        cy.get('.oxd-table-filter').should('be.visible')
        cy.get('.oxd-text.oxd-text--span').should('be.visible')
        cy.get('.orangehrm-paper-container').should('be.visible')
    }
    
    //Directoryzone
    assertionDirectoryForm(){
        cy.contains('Directory').should('be.visible')
        cy.contains('Employee Name').should('be.visible')
        cy.contains('Job Title').should('be.visible')
        cy.contains('Location').should('be.visible')
    }
    typeEmployeeName(name){
        cy.get('input[placeholder="Type for hints..."]').type(name)
    }
    chooseEmployeeName(name){
        cy.contains(name).click()
    }
    clickBtnJobDrodown(){
        cy.get('.oxd-select-text').eq(0).click()
    }
    verifyJobTitleData(){
        cy.get('.oxd-select-option').should('have.length.greaterThan',1)
        cy.get('.oxd-select-option').first().should('be.visible')
    }
    chooseJobTitle(jobTitle){
        cy.contains(jobTitle).click()
    }
    clickBtnLocationDrodown(){
        cy.get('.oxd-select-text').eq(1).click()
    }
    verifyLocationData(){
        cy.get('.oxd-select-option').should('have.length.greaterThan',1)
        cy.get('.oxd-select-option').first().should('be.visible')
    }
    chooseLocation(location){
        cy.contains(location).click()
    }
   
    assertionInvalidName(){
        cy.contains('Invalid').should('be.visible')
    }
    assertionNoRecords(){
        cy.contains('No Records Found').should('be.visible')
    }
    assertionRecords(){
        cy.contains('Records Found').should('be.visible')
    }
    clickReset(){
        cy.get('[type="reset"]').click()
    }
    verifyEmptyField(){
        cy.get('input[placeholder="Type for hints..."]').should("have.value", "")
    }
     clickSearch(){
        cy.get('[type="submit"]').click()
    }
    //recordzone
    interceptDirectoryRecordsAPI(){
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees**').as('Records')
    }
    verifyDirectoryRecordsAPI(){
        cy.wait('@Records').then((interception)=>{
            expect(interception.request.method).to.eq('GET')
            expect(interception.response.statusCode).to.eq(200)
        })
    }
    verifyEmployeeName(employeeName){
        cy.get('.orangehrm-directory-card').should('contains', employeeName)
    }
    verifyEmployeeCardData(name, job, location){
        cy.contains('.orangehrm-directory-card', name)
        .should('be.visible')
        .within(()=>{
        cy.contains(job).should('be.visible')
        cy.contains(location).should('be.visible')
        })
    }
    clickEmployeeCard(name){
        cy.contains('.orangehrm-directory-card', name).click()
    }
    verifyEmployeeData(){
        cy.get('.orangehrm-corporate-directory-sidebar').should('be.visible')
    }
    verifyEmployeeInformation(name, job,department, location){
        cy.contains('.orangehrm-directory-card', name)
        .should('be.visible')
        .within(()=>{
        cy.contains(name).should('be.visible')
        cy.contains(job).should('be.visible')
        cy.contains(department).should('be.visible')
        cy.contains(location).should('be.visible')
        })
    }
    verifyNoRecordsFoundNotification(){
        cy.get('.oxd-toast-container').should('contains', 'Info')
    }
}
export default new directoryPage