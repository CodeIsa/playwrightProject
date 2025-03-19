// @ts-check
const { test, expect } = require('@playwright/test');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  //visit
  

  //openLeadModal
  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  //submitLeadForm
  await page.getByPlaceholder('Informe seu nome').fill('Isabelle')
  await page.getByPlaceholder('Informe seu email').fill('Isabelle@gmail.com')
  
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  //toastHaveText
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!' 
  await expect(page.locator('.toast')).toHaveText(message)
  await expect(page.locator('.toast')).toBeHidden({timeout: 5000})
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Isabelle')
  await page.getByPlaceholder('Informe seu email').fill('Isabelle.com.br')
  
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
  
});

test('não deve cadastrar quando o nome não é preenchdo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu email').fill('isabelle@gmail.com')
  
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  
});

test('não deve cadastrar quando o email não é preenchdo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')

  await page.getByPlaceholder('Informe seu nome').fill('Isabelle')
  
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
  
});

test('não deve cadastrar quando nenhum campo é preenchdo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {name: /Aperte o play/}).click()

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera')
  
  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click()

  await expect(page.locator('.alert')).toHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
  
});
