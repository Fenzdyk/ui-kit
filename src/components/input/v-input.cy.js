import VInput from '@/components/input/v-input.vue';

describe('<VInput/>', () => {
  it('renders', () => {
    cy.mount(VInput);
    cy.get('.input').type('dev-kmcl');
    cy.should('have.value', 'dev-kmcl');
  });
  it('error input', () => {
    const props = {
      errorText: 'error',
      error: true
    };
    cy.mount(VInput, { props })
      .as('wrapper')
      .get('.input-wrapper')
      .should('have.class', 'error')
      .get('.input-error')
      .should('have.text', 'error');
  });
});
