import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { TransactionModal } from './components/TransactionModal'
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal'
import { useState } from "react";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpen() {
    setIsNewTransactionModalOpen(true);
  }

  function handleClose() {
      setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenModal={handleOpen} />
      <GlobalStyle />
      <TransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleClose}/>
      <Dashboard />
    </TransactionsProvider>
  );
}