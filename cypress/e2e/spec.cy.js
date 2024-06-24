describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Marca todas as tarefas como completas', () => {
    cy.visit('http://127.0.0.1:7001');
  
    cy.get('.new-todo')
      .type('Completa 1{enter}')
      .type('Completa 2{enter}')
      .type('Completa 3{enter}');
  
    cy.get('.toggle-all-label')
      .click();
  
    cy.get('.todo-list li')
      .each(($el) => {
        cy.wrap($el).should('have.class', 'completed');
      });
  });  

  it('Limpa tarefas completas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa Limpar{enter}')
      .type('Tarefa Limpar 2{enter}')
      .type('Tarefa Limpar 3{enter}');

    cy.get('.toggle-all-label')
      .click();

    cy.get('.clear-completed').click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Edita uma tarefa e verifica se a edição foi salva corretamente', () => {
    cy.visit('http://127.0.0.1:7001');
    
    cy.get('.new-todo')
      .type('Data da prova de ES: 01/07{enter}');

    cy.get('.todo-list li').dblclick();

    cy.get('.todo-list li input.edit')
      .clear()
      .type('Data da prova de ES: 08/07{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .and('contain', 'Data da prova de ES: 08/07');
  });
});