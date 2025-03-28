const { test, expect } = require('@playwright/test')

const {LoginPage} = require('../pages/LoginPage')

let loginPage

test.beforeEach(({page})=> {
    loginPage = new LoginPage(page)
})

test('deve logar como administrador', async ({page})=> {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({page})=> {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'abc23')
    await loginPage.isLoggedIn()
})