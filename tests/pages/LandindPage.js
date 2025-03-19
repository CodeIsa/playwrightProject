class LandingPage {
    async visit() {
        await page.goto('http://localhost:3000')
    }

    async openLeadModal() {
        await page.getByRole('button', {name: /Aperte o play/}).click()

        await expect(
          page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm() {
        await page.getByPlaceholder('Informe seu nome').fill('Isabelle')
        await page.getByPlaceholder('Informe seu email').fill('Isabelle@gmail.com')
        
        await page.getByTestId('modal')
          .getByText('Quero entrar na fila!').click()
    }

    async toastHaveText() {
        const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!' 
        await expect(page.locator('.toast')).toHaveText(message)
        await expect(page.locator('.toast')).toBeHidden({timeout: 5000})
    }
}