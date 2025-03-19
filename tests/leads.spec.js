// @ts-check
const { test, expect } = require('@playwright/test');

const { LandingPage } = require('./pages/LandindPage')

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm("Isabelle", "isaoliveira782@gmail.com")

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!' 
  await landingPage.toastHaveText(message)
 
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm("Isabelle", "isaoliveira782gmail.com.br")

  await landingPage.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não é preenchdo', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm("", "isaoliveira782@gmail.com")

  await landingPage.alertHaveText('Campo obrigatório')
  
});

test('não deve cadastrar quando o email não é preenchdo', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm("Isabelle", "")

  await landingPage.alertHaveText('Campo obrigatório')
  
});

test('não deve cadastrar quando nenhum campo é preenchdo', async ({ page }) => {
  const landingPage = new LandingPage(page)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm("", "")

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
  
});
