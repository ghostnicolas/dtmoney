import Modal from 'react-modal'
import { Container, TransactionType, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incImg from '../../assets/income.svg';
import outImg from '../../assets/outcome.svg';
import { FormEvent, useState, useContext } from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';

interface ModalProps {
    isOpen: boolean,
    onRequestClose: () => void;
}

export function TransactionModal({ isOpen, onRequestClose }: ModalProps) {
    const { createTransaction} = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreate(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
    <Modal isOpen={isOpen} 
    onRequestClose={onRequestClose} 
    overlayClassName="react-modal-overlay" 
    className="react-modal-content" 
    > 
    <button type="button" 
    onClick={onRequestClose}
    className="react-modal-close"
    >    
        <img src={closeImg} alt="Fechar Modal" />
    </button>
        <Container onSubmit={handleCreate}>
            <h2>Cadastrar transação</h2>

            <input placeholder='Titulo' value={title} onChange={event => setTitle(event.target.value)}/>
            <input placeholder='Valor' type="number" value={amount} onChange={event => setAmount(Number(event.target.value))}/>
            <TransactionType>
                <RadioBox type="button" 
                onClick={() => { setType('deposit') }}
                isActive={type === 'deposit'}>
                    <img src={incImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>

                <RadioBox type="button" 
                onClick={() => { setType('withdraw') }}
                isActive={type === 'withdraw'}>
                    <img src={outImg} alt="Saida" />
                    <span>Saida</span>
                </RadioBox>
            </TransactionType>
            <input placeholder='Categoria' value={category} onChange={event => setCategory(event.target.value)} />

            <button type="submit">Cadastrar</button>
        </Container>
        </Modal>    
    )
}