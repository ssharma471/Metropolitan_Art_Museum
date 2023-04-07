import React from 'react'
import { searchHistoryAtom } from "@/store";
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { ListGroup, Button } from 'react-bootstrap';
import { removeFromHistory } from '@/lib/userData';
import styles from '@/styles/History.module.css';
const history = () => {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    let parsedHistory = [];
    if(!searchHistory) return null;
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });
    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`)
    };
    async function removeHistoryClicked (e, index){
        e.stopPropagation(); 
        // setSearchHistory(current => {
        //     let x = [...current];
        //     x.splice(index, 1)
        //     return x;
        // });
        setSearchHistory(await removeFromHistory(searchHistory[index]))
    };
    return (
        <>
            {parsedHistory.length === 0 ?
                <Card>
                    <Card.Body>
                        <Card.Title>There is no current Search History</Card.Title>
                        <Card.Text>Please search again for Artwork to get the History</Card.Text>
                    </Card.Body>
                </Card>:
                <ListGroup className="mt-3">
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                            {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </>)
}
export default history