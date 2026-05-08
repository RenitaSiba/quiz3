describe('API Testing platzyAPI', ()=>{
    it('Get All category', ()=>{
        cy.request({
            method: 'GET',
            url:'https://api.escuelajs.co/api/v1/categories'
        }).then((response) =>{
            expect(response.status).to.eq(200)
 
        })
    })
    it('Get a single category by Id', ()=>{
        cy.request({
            method: 'GET',
            url:'https://api.escuelajs.co/api/v1/categories/1'
        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id',1)
            expect(response.body).to.have.property('name', 'Kategori Diupdate')
        })
    })
    it('Get invalid category by Id', ()=>{
        cy.request({
            method: 'GET',
            url:'https://api.escuelajs.co/api/v1/categories/90',
            failOnStatusCode : false
        }).then((response) =>{
            expect(response.status).to.eq(404)
            
        })
    })
    it('Create a category', ()=>{
        cy.request({
            method: 'POST',
            url:'https://api.escuelajs.co/api/v1/categories',
            body:{
                "name":"New Category",
                "image": "https://placeimg.com/640/480/any"
            },
        }).then((response) =>{
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name','New Category')
            expect(response.body).to.have.property('image','https://placeimg.com/640/480/any')
            
        })
    })
    it('Update a category', ()=>{
        cy.request({
            method: 'PUT',
            url:'https://api.escuelajs.co/api/v1/categories/3',
            body:{
                "name": "Updated Category Name",
                "image": "https://placeimg.com/640/480/any"
            },
        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name', 'Updated Category Name')
            expect(response.body).to.have.property('image','https://placeimg.com/640/480/any')
            
        })
    })
    it('Update a category without name', ()=>{
        cy.request({
            method: 'PUT',
            url:'https://api.escuelajs.co/api/v1/categories/5',
            body:{
                "image": "https://placeimg.com/640/480/any"
            },
        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('image','https://placeimg.com/640/480/any')
            
        })
    })
    it('Update a category without body', ()=>{
        cy.request({
            method: 'PUT',
            url:'https://api.escuelajs.co/api/v1/categories/5',
            body:{
                
            }
        }).then((response) =>{
            expect(response.status).to.eq(200)  
        })
    })
    it('Delete a category', ()=>{
        cy.request({
            method: 'DELETE',
            url:'https://api.escuelajs.co/api/v1/categories/5',
            failOnStatusCode : false,
        }).then((response) =>{
            expect(response.status).to.eq(400)
 
        })
    })
    it('Get all products by category', ()=>{
        cy.request({
            method: 'GET',
            url:'https://api.escuelajs.co/api/v1/categories/4/products',
            body:{
                
            }
        }).then((response) =>{
            expect(response.status).to.eq(200)
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('title')
            expect(response.body[0]).to.have.property('price')
            expect(response.body[0]).to.have.property('description')
            
        })
    })


})