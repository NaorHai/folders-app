import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  STORAGE_KEY = 'KEY_FOLDERS_APP';
  OPTIONS = 'OPTIONS';
  obj: any;
  allOptions = ['Item1', 'Item2', 'Item4', 'Item3'];
  rootHierarchy: any = {
    children: [
      {
        state: false, name: `Item1`, children: [
          {
            state: false, name: `Item2`, children: [
              {state: false, name: `Item4`, children: []}
            ]
          },
        ]
      },
      {state: false, name: `Item3`, children: []}
    ]
  };

  constructor() {
    let storedState = localStorage.getItem(this.STORAGE_KEY);
    let storeOpt = localStorage.getItem(this.OPTIONS);
    if (storedState && storeOpt) {
      this.rootHierarchy = JSON.parse(storedState);
      this.allOptions = JSON.parse(storeOpt);
    }
  }

  isDirNameExist(dirName: string) {
    let isExist = this.allOptions.find(name => dirName === name);

    if (isExist) {
      return true;
    } else return false;
  }

  newParent(dirName: string) {
    if (this.isDirNameExist(dirName)) {
      alert(`name ${dirName} already exist!`);
      return;
    }

    this.rootHierarchy.children.push({state: false, name: dirName, children: []});
    this.allOptions.push(dirName);
  }

  saveNewFolder(dirName: string, par: string) {
    if (this.isDirNameExist(dirName)) {
      alert(`name ${dirName} already exist!`);
      return;
    }

    let itemParent;

    itemParent = this.getDirObj(this.rootHierarchy, par);
    if (itemParent) {
      itemParent.children.push({
        state: false,
        name: dirName,
        children: []
      });
      this.allOptions.push(dirName);
    }
  }

  deleteFolder(dirName: string, parent: string) {
    if (!this.isDirNameExist(dirName)) {
      return;
    } else {
      let objParent = this.getDirObj(this.rootHierarchy, parent);
      let childIndex;

      if (objParent) {
        objParent.children.forEach((item, i) => {
          if (item.name === dirName) {
            childIndex = i;
          }
        });
        objParent.children.splice(childIndex, 1);
      }
      //no parent means its a root one
     else{
        this.rootHierarchy.children.forEach((item, i) => {
          if (item.name === dirName) {
            childIndex = i;
          }
        });
        this.rootHierarchy.children.splice(childIndex, 1);
      }
    }
    this.allOptions = this.allOptions.filter(name => name !== dirName);
  }

  saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.rootHierarchy));
    localStorage.setItem(this.OPTIONS, JSON.stringify(this.allOptions));
  }

  private getDirObj(parent: any, name: string) {
    for (let child of parent.children) {
      if (child.name === name) {
        this.obj = child;
        break;
      }
      this.getDirObj(child, name);
    }
    return this.obj;
  }
}
