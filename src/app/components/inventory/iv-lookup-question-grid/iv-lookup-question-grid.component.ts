import { Component, input, model, ModelSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';

import { IvLookupQuestionComponent } from '../iv-lookup-question/iv-lookup-question.component';
import { IvLookupPath } from '../../../models/inventory/inventory-lookup-path';
import { Subject, takeUntil } from 'rxjs';
import { IvLookupCache } from '../../../models/inventory/inventory-lookup-cache';
import { QueryData } from '../../../services/api-interfaces';
import { InventoryConst } from '../../../../constants/ui-constants';
import { IvLookupSelection } from '../../../models/inventory/inventory-lookup-selection';
import { IvLookupService } from '../../../services/inventory/iv-lookup-service';

// TODO: Refactor question grid. Can we simply events/bindings even more? Move state to service?

@Component({
  selector: 'pb-iv-lookup-question-grid',
  imports: [IvLookupQuestionComponent],
  templateUrl: './iv-lookup-question-grid.component.html',
  styleUrl: './iv-lookup-question-grid.component.scss',
})
export class IvLookupQuestionGridComponent implements OnInit, OnDestroy {

	// Subjects
	private m_onDestroy = new Subject<void>();

	private m_leafDict:ModelSignal<IvLookupPath[]>[] = [];
	private m_selectedLeafDict:ModelSignal<IvLookupPath|null>[] = [];
	private m_leafCache:IvLookupCache = new IvLookupCache();
	private m_resetting:boolean = false;
	
	// Store
	public lookupStore = input.required<IvLookupService>();

	// Leaf Sources
	public leaf1:ModelSignal<IvLookupPath[]> = model<IvLookupPath[]>([]);
	public leaf2:ModelSignal<IvLookupPath[]> = model<IvLookupPath[]>([]);
	public leaf3:ModelSignal<IvLookupPath[]> = model<IvLookupPath[]>([]);
	public leaf4:ModelSignal<IvLookupPath[]> = model<IvLookupPath[]>([]);
	public leaf5:ModelSignal<IvLookupPath[]> = model<IvLookupPath[]>([]);
	public leaf6:ModelSignal<IvLookupPath[]> = model<IvLookupPath[]>([]);
	public leaf7:ModelSignal<IvLookupPath[]> = model<IvLookupPath[]>([]);

	// Leaf Selections
	public selectedLeaf1:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);
	public selectedLeaf2:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);
	public selectedLeaf3:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);
	public selectedLeaf4:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);
	public selectedLeaf5:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);
	public selectedLeaf6:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);
	public selectedLeaf7:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);

	constructor() {}

	ngOnInit(): void {

		// Local Dict
		this.m_leafDict = [
			this.leaf1,
			this.leaf2,
			this.leaf3,
			this.leaf4,
			this.leaf5,
			this.leaf6,
			this.leaf7
		];
		this.m_selectedLeafDict = [
			this.selectedLeaf1,
			this.selectedLeaf2,
			this.selectedLeaf3,
			this.selectedLeaf4,
			this.selectedLeaf5,
			this.selectedLeaf6,
			this.selectedLeaf7
		];

		// Subscriptions
		for(let i = 0; i < this.m_selectedLeafDict.length; i++) {
			this.m_selectedLeafDict[i].subscribe(v => this.onLeafSelected.bind(this, v, i + 1)());
		}
		this.lookupStore().leafCache$.pipe(takeUntil(this.m_onDestroy)).subscribe(v => this.handleCacheChange(v));
	}

	ngOnDestroy(): void {
		this.m_onDestroy.next();
	}

	resetLeafs(resetAt:number) {
		if(!this.m_resetting) {
			this.m_resetting = true;
			for(let i = resetAt; i <= InventoryConst.ivLeafs.lastLevel; i++) {
				this.m_selectedLeafDict[i - 1].set(null);
			}
			this.m_resetting = false;
		}
	}

	notifyLeafSelection() {
		const newSelection = new IvLookupSelection(this.m_selectedLeafDict.map(l => l()));
		this.lookupStore().setLeafSelection(newSelection);
	}

	// Leaf Handlers

	handleCacheChange(value:IvLookupCache) {
		this.m_leafCache = value;
		this.m_leafDict[InventoryConst.ivLeafs.firstLevel - 1].set(this.m_leafCache.getLeafByLevel(InventoryConst.ivLeafs.firstLevel));
	}

	handleLeafQuery(value:QueryData<IvLookupPath>, leafLevel:number) {
		this.m_leafCache.setLeafByLevel(value.records, leafLevel);
		if(leafLevel === 1) {
			this.m_leafDict[leafLevel - 1].set(this.m_leafCache.getLeafByLevel(leafLevel));
		}
	}

	onLeafSelected(leaf:IvLookupPath|null, level:number) {
		if(!this.m_resetting) {
			this.resetLeafs(level + 1);
			const cache = this.m_leafCache.getLeafByLevel(level + 1);
			const optSet = this.m_leafDict[level];
			if(leaf) {
				const filteredItems = cache.filter(l => l.parentId === leaf.pathId);
				optSet.set(filteredItems);
			} else {
				optSet.set([]);
			}
			this.notifyLeafSelection();
		}
	}

	onClearLeaf(ivlookupLeaf:IvLookupPath|null) {
		const level = ivlookupLeaf?.level;
		if(level) {
			this.resetLeafs(level);
			this.notifyLeafSelection();
		} else {
			console.warn("No leaf level was provided to clear from.");
		}
	}
}
