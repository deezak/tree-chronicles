import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AskMe from './AskMe';
import { httpsCallable } from 'firebase/functions';

jest.mock('firebase/functions', () => ({
  getFunctions: jest.fn(),
  httpsCallable: jest.fn(() => jest.fn()),
}));

const mockAskBlogBot = httpsCallable.mock.results[0].value;

test('asks the blog assistant and displays its answer with a source link', async () => {
  mockAskBlogBot.mockResolvedValue({
    data: {
      answer: 'The blog describes a memorable meal in Lisbon. [1]',
      sources: [{ id: 'lisbon-post', title: 'A Meal in Lisbon', location: 'Lisbon, Portugal' }],
    },
  });

  render(
    <MemoryRouter>
      <AskMe setActive={jest.fn()} />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText('Your travel question'), {
    target: { value: 'What did you eat in Lisbon?' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Ask' }));

  expect(await screen.findByText('The blog describes a memorable meal in Lisbon. [1]')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'A Meal in Lisbon · Lisbon, Portugal' }))
    .toHaveAttribute('href', '/detail/lisbon-post');
  expect(mockAskBlogBot).toHaveBeenCalledWith({
    question: 'What did you eat in Lisbon?',
    history: [],
  });
});
