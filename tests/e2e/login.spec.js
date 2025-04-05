const { test, expect } = require('@playwright/test')

const {LoginPage} = require('../pages/LoginPage')
const {MoviesPage} = require('../pages/MoviesPage') 
const {Toast} = require('../pages/Components')

let loginPage
let toast
let moviesPage
test.beforeEach(({page})=> {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})

test('deve logar como administrador', async ({page})=> {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggedIn()
})

test('não deve logar com senha incorreta', async ({page})=> {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'abc23')

    const message = 'OOps!Ocorreu um erroao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente'
    await toast.haveText(message)
})

test('não deve logar quando email é inválido', async ({page})=> {
    await loginPage.visit()
    await loginPage.submit('www.isabelle.com', 'abc23')
    await loginPage.alertHaveText('Email icorreto')
})

test('não deve logar quando email não é preenchido', async ({page})=> {
    await loginPage.visit()
    await loginPage.submit('', 'abc23')
    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é preenchida', async ({page})=> {
    await loginPage.visit()
    await loginPage.submit('isaoliveira782@gmail.com', '')
    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando nenhum campo é preenchida', async ({page})=> {
    await loginPage.visit()
    await loginPage.submit('', '')
    await loginPage.alertHaveText('Campo obrigatório', 'Campo obrigatório')
})