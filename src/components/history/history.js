import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Table, Label} from 'semantic-ui-react';
import SmallError from '../error/small/small';
import {transactionLink, addressLink} from '../../util/etherscan';
import {EMPTY_TRANSACTION_HISTORY} from '../../error/type';
import './history.css';

export default class History extends Component {

    static propTypes = {
        history: PropTypes.arrayOf(
            PropTypes.shape({
                blockHash: PropTypes.string.isRequired,
                blockNumber: PropTypes.number.isRequired,
                from: PropTypes.string.isRequired,
                to: PropTypes.string.isRequired,
                transactionHash: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired
            })
        ).isRequired
    };

    render() {
        let historyView;

        if (history.length === 0) {
            historyView = History.renderEmpty();
        } else {
            historyView = this.renderContent();
        }

        return (
            <div>
                {historyView}
            </div>
        );
    };

    renderContent() {
        const history = this.props.history;

        return (
            <div>
                <Table basic='very' celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Direction</Table.HeaderCell>
                            <Table.HeaderCell>TxHash</Table.HeaderCell>
                            <Table.HeaderCell>From</Table.HeaderCell>
                            <Table.HeaderCell>To</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {history.map(item => History.renderTransaction(item))}
                    </Table.Body>
                </Table>
            </div>
        );
    };

    static renderEmpty() {
        return (
            <div>
                <SmallError
                    className='transaction_history_empty_error'
                    payload={EMPTY_TRANSACTION_HISTORY}/>
            </div>
        );
    };

    static renderTransaction(transaction) {
        return (
            <Table.Row key={transaction.transactionHash}>
                <Table.Cell>
                    <Label
                        horizontal
                        color={History.transactionColor(transaction)}
                    >
                        {transaction.direction}
                    </Label>
                </Table.Cell>
                <Table.Cell>
                    {
                        History.renderLink(
                            transaction.transactionHash,
                            transactionLink(transaction.transactionHash)
                        )
                    }
                </Table.Cell>
                <Table.Cell>
                    {
                        History.renderLink(
                            transaction.from,
                            addressLink(transaction.from)
                        )
                    }
                </Table.Cell>
                <Table.Cell>
                    {
                        History.renderLink(
                            transaction.to,
                            addressLink(transaction.to)
                        )
                    }
                </Table.Cell>
                <Table.Cell>
                    {transaction.value}
                </Table.Cell>
            </Table.Row>
        );
    };

    static transactionColor({direction}) {
        if (direction === 'In') {
            return 'green';
        } else {
            return 'red';
        }
    }

    static renderLink(text, link) {
        return (
            <a
                target='_blank'
                href={link}>
                {text.substring(0, 16) + '...'}
            </a>
        );
    };
}
