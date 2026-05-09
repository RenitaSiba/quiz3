import loginPage from "../support/pageObjects/loginPage.js"
import directoryPage from "../support/pageObjects/directoryPage.js"

describe('Test Feature Directory', () =>{
    it('TC014-Menu Directory Harus Berfungsi', () =>{
        directoryPage.interceptDirectoryMenuAPI()
        directoryPage.clickDirectoryMenu()
        directoryPage.verifyDirectoryMenuApi()
        directoryPage.assertionDirectoryMenu()
    })
    beforeEach(()=>{
        loginPage.visitPage()
        directoryPage.visitDashboardPage()
        directoryPage.clickDirectoryMenu()
    })
    it('TC015-Fitur Directory Dapat Diakses',()=>{
        directoryPage.assertionDirectoryForm()
    })
    it('TC016-Job Title Dropdown Berfungsi',()=>{
        directoryPage.clickBtnJobDrodown()
        directoryPage.verifyJobTitleData()
    })
    it('TC017-Location Dropdown Berfungsi',()=>{
        directoryPage.clickBtnLocationDrodown()
        directoryPage.verifyLocationData()
    })
    it('TC018-Button Search Berfungsi',()=>{
        directoryPage.clickSearch()
        directoryPage.assertionRecords()
    })
    it('TC019-Search filters dapat di reset',()=>{
        directoryPage.typeEmployeeName('Joseph')
        directoryPage.chooseEmployeeName('Joseph Evans')
        directoryPage.clickBtnJobDrodown()
        directoryPage.verifyJobTitleData()
        directoryPage.chooseJobTitle('Software Engineer')
        directoryPage.clickBtnLocationDrodown()
        directoryPage.verifyLocationData()
        directoryPage.chooseLocation('New York Sales Office')
        directoryPage.clickReset()
        directoryPage.verifyEmptyField()
    })
    it('TC020-Search records dengan nama yang valid',()=>{
        directoryPage.typeEmployeeName('John 34 444444')
        directoryPage.assertionRecords()
    })
    it('TC021-Search records dengan nama yang invalid',()=>{
        directoryPage.typeEmployeeName('sanbercode')
        directoryPage.clickSearch()
        directoryPage.assertionInvalidName()
    })
    it('TC022-Search records dengan filter Job Title yang terdaftar',()=>{
        directoryPage.clickBtnJobDrodown()
        directoryPage.verifyJobTitleData()
        directoryPage.chooseJobTitle('Software Engineer')
        directoryPage.clickSearch()
        directoryPage.assertionRecords()

    })
    it('TC023-Search records dengan filter Location yang terdaftar',()=>{
        directoryPage.clickBtnLocationDrodown()
        directoryPage.verifyLocationData()
        directoryPage.chooseLocation('Canadian Regional HQ')
        directoryPage.clickSearch()
        directoryPage.assertionRecords()

    })
    it('TC024-Search records dengan Employee name, Job title, Location yang valid',()=>{
        directoryPage.interceptDirectoryRecordsAPI()
        directoryPage.typeEmployeeName('Russel')
        directoryPage.chooseEmployeeName('Russel Hamilton')
        directoryPage.clickBtnJobDrodown()
        directoryPage.verifyJobTitleData()
        directoryPage.chooseJobTitle('Software Engineer')
        directoryPage.clickBtnLocationDrodown()
        directoryPage.verifyLocationData()
        directoryPage.chooseLocation('Texas R&D')
        directoryPage.clickSearch()
        directoryPage.verifyDirectoryRecordsAPI()
        directoryPage.assertionRecords()
        directoryPage.verifyEmployeeCardData('Russel Hamilton','Software Engineer','Texas R&D')

    })
    it('TC025-Search records dengan Employee name, Job title, Location yang valid',()=>{
        directoryPage.interceptDirectoryRecordsAPI()
        directoryPage.typeEmployeeName('Russel')
        directoryPage.chooseEmployeeName('Russel Hamilton')
        directoryPage.clickBtnJobDrodown()
        directoryPage.verifyJobTitleData()
        directoryPage.chooseJobTitle('Software Engineer')
        directoryPage.clickBtnLocationDrodown()
        directoryPage.verifyLocationData()
        directoryPage.chooseLocation('Texas R&D')
        directoryPage.clickSearch()
        directoryPage.verifyDirectoryRecordsAPI()
        directoryPage.assertionRecords()
        directoryPage.verifyEmployeeCardData('Russel Hamilton','Software Engineer','Texas R&D')

    })
    it('TC026-Employee Information dapat diakses',()=>{
        directoryPage.interceptDirectoryRecordsAPI()
        directoryPage.typeEmployeeName('Rebecca')
        directoryPage.chooseEmployeeName('Rebecca Harmony')
        directoryPage.clickBtnJobDrodown()
        directoryPage.verifyJobTitleData()
        directoryPage.chooseJobTitle('QA Engineer')
        directoryPage.clickBtnLocationDrodown()
        directoryPage.verifyLocationData()
        directoryPage.chooseLocation('Texas R&D')
        directoryPage.clickSearch()
        directoryPage.verifyDirectoryRecordsAPI()
        directoryPage.clickEmployeeCard('Rebecca Harmony')
        directoryPage.verifyEmployeeInformation('Rebecca Harmony','QA Engineer', 'Quality Assurance', 'Texas R&D')
    })




    
})