import { api, LightningElement } from 'lwc';

//import {
//    getItemById,
//} from '../../data/idb';

export default class Cast extends LightningElement {

    @api items = [];

    @api next(prevId, prevParent){
        //console.log('Playlist: next call - ', prevId, ' -- ', prevParent);
        // remove prev
        this.remove({
            currentTarget: {
                dataset: {
                    id: prevId,
                    parentid: prevParent,
                }
            }
        });

        // get next thats not the prev
        const {
            id,
            parentid,
        } = this.items.find(x => x.id !== prevId);

        // play next
        this.play({
            currentTarget: {
                dataset: {
                    id,
                    parentid,
                }
            }
        })
    }

    play(event) {

        const {
            id,
            parentid,
        } = event.currentTarget.dataset;

        console.log('Playlist: selectItem ', id, ' of ', parentid)

        if(!id || !parentid){ return undefined }

        this.dispatchEvent(new CustomEvent('select', {
            bubbles: true,
            composed: true,
            detail: {
                id,
                parentid,
            },
        }));
    }

    remove(event) {

        const {
            id,
            parentid,
        } = event.currentTarget.dataset;

        console.log('Playlist: remove item ', id, ' of ', parentid)

        if(!id || !parentid){ return undefined }

        this.dispatchEvent(new CustomEvent('remove', {
            bubbles: true,
            composed: true,
            detail: {
                id: parentid+';;;'+id,
                store: 'audio',
            },
        }));
    }
}