import * as React from 'react';
import * as dom from 'react-dom/client';
import * as obs from 'obsidian';
import {WorkspaceLeaf} from "obsidian";

export const TYPST_VIEW = 'typst-view';

export default class TypstEditor extends obs.Plugin {
	async onload() {
		this.registerView(TYPST_VIEW, leaf => new TypstView(leaf, this));
		this.registerExtensions(["typst"], TYPST_VIEW);
	}
}

export class TypstView extends obs.EditableFileView {
	constructor(readonly leaf: WorkspaceLeaf, private plugin: TypstEditor) {
		super(leaf);
	}

    getViewType(): string {
        return TYPST_VIEW;
    }
}