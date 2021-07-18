import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

import { createServer, Model } from 'miragejs';

import { GlobalStyle } from './styles/global';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de website',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 1000,
          createdAt: new Date()
        },
        {
          id: 2,
          title: 'Hambúrguer',
          type: 'withdraw',
          category: 'Alimentação',
          amount: 40,
          createdAt: new Date()
        },
      ]
    });
  },
  routes() {
    this.namespace = 'api';

    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', { ...data, createdAt: new Date() });
    });

    this.get('transactions', () => {
      return this.schema.all('transaction');
    });
  }
});

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModal] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModal(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModal(false);
  }

  return (
    <TransactionsProvider>
      <Header
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
