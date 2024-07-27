describe('test add ingredient to constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });
  it('should add bun to constructor', () => {
    cy.get('[data-cy=bun-category]').contains('Добавить').click();
    cy.get('[data-cy=bun-top').contains('Булка 1').should('exist');
    cy.get('[data-cy=bun-bottom').contains('Булка 1').should('exist');
  });

  it('should add ingredient to constructor', () => {
    cy.get('[data-cy=main-category]').contains('Добавить').click();
    cy.get('[data-cy=sauce-category]').contains('Добавить').click();
    cy.get('[data-cy=mains-category').contains('Начинка 1').should('exist');
    cy.get('[data-cy=mains-category').contains('Соус 1').should('exist');
  });
});

describe('test the modal operation', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('/');
  });

  it('test open modal', () => {
    cy.contains('Ингредиенты').should('not.exist');
    cy.contains('Булка 1').click();
    cy.contains('Ингредиенты').should('exist');
    cy.get('#modals').contains('Булка 1').should('exist');
  });

  it('test close modal on click to button', () => {
    cy.contains('Булка 1').click();
    cy.contains('Ингредиенты').should('exist');
    cy.get('#modals button[data-cy=close-button]').click();
    cy.contains('Ингредиенты').should('not.exist');
  });

  it('test close modal on click to overlay', () => {
    cy.contains('Булка 1').click();
    cy.contains('Ингредиенты').should('exist');
    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.contains('Ингредиенты').should('not.exist');
  });
});

describe('test post order', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post.json' }).as(
      'postOrder'
    );
    window.localStorage.setItem('refreshToken', 'test-refreshToken');
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should order work', () => {
    cy.get('[data-cy=bun-category]').contains('Добавить').click();
    cy.get('[data-cy=bun-top').contains('Булка 1').should('exist');
    cy.get('[data-cy=bun-bottom').contains('Булка 1').should('exist');
    cy.get('[data-cy=main-category]').contains('Добавить').click();
    cy.get('[data-cy=sauce-category]').contains('Добавить').click();
    cy.get('[data-cy=mains-category').contains('Начинка 1').should('exist');
    cy.get('[data-cy=mains-category').contains('Соус 1').should('exist');
    cy.contains('Оформить заказ').click();
    cy.wait('@postOrder');

    cy.contains('идентификатор заказа').should('exist');
    cy.get('#modals').contains('123').should('exist');

    cy.get('#modals button[data-cy=close-button]').click();
    cy.contains('идентификатор заказа').should('not.exist');

    cy.get('[data-cy=buns-category').contains('Булка 1').should('not.exist');
    cy.get('[data-cy=mains-category').contains('Начинка 1').should('not.exist');
    cy.get('[data-cy=mains-category').contains('Соус 1').should('not.exist');
  });
});
