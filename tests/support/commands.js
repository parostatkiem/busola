import 'cypress-file-upload';
import config from '../config';

Cypress.Commands.add(
  'shouldHaveTrimmedText',
  { prevSubject: true },
  (subject, equalTo) => {
    expect(subject.text().trim()).to.eq(equalTo);
    return subject;
  },
);

Cypress.Commands.add('goToNamespaceDetails', () => {
  // // Go to the details of namespace
  cy.getIframeBody()
    .contains('a', config.namespaceName)
    .click();

  return cy.end();
});

/**
 * Simulates a paste event.
 *
 * @example
 * cy.get('some-selector').paste({
 *  pastePayload: 'String example'
 *  });
 */
Cypress.Commands.add(
  'paste',
  {
    prevSubject: true,
  },
  paste,
);

/**
 * Simulates a paste event.
 *
 * @param subject A jQuery context representing a DOM element.
 * @param pastePayload Simulated String that is on the clipboard.
 *
 * @returns The subject parameter.
 */
function paste(subject, { pastePayload }) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  const pasteEvent = Object.assign(
    new Event('paste', { bubbles: true, cancelable: true }),
    {
      clipboardData: {
        getData: (type = 'text') => pastePayload,
      },
    },
  );
  subject[0].dispatchEvent(pasteEvent);

  return subject;
}

Cypress.Commands.add('getLeftNav', () => {
  cy.get('nav[data-testid=semiCollapsibleLeftNav]');
});
