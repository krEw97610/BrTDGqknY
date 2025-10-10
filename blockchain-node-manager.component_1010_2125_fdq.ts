// 代码生成时间: 2025-10-10 21:25:22
import { Component, OnInit } from '@angular/core';
import { BlockchainNodeService } from './blockchain-node.service';
import { BlockchainNode } from './blockchain-node.model';

@Component({
  selector: 'app-blockchain-node-manager',
  templateUrl: './blockchain-node-manager.component.html',
  styleUrls: ['./blockchain-node-manager.component.css']
})
export class BlockchainNodeManagerComponent implements OnInit {
  // Stores the list of blockchain nodes
  nodes: BlockchainNode[] = [];
  
  // Inject the BlockchainNodeService
  constructor(private nodeService: BlockchainNodeService) {}
  
  // Lifecycle hook to initialize data
  ngOnInit() {
    this.loadNodes();
  }
  
  // Loads the blockchain nodes from the service
  loadNodes(): void {
    this.nodeService.getAllNodes().subscribe({
      next: (nodes) => {
        this.nodes = nodes;
      },
      error: (err) => {
        console.error('Failed to load nodes', err);
      }
    });
  }
  
  // Adds a new node to the list
  addNode(node: BlockchainNode): void {
    this.nodeService.addNode(node).subscribe({
      next: (newNode) => {
        this.nodes.push(newNode);
      },
      error: (err) => {
        console.error('Failed to add node', err);
      }
    });
  }
  
  // Removes a node from the list
  removeNode(node: BlockchainNode): void {
    this.nodeService.removeNode(node).subscribe({
      next: () => {
        this.nodes = this.nodes.filter(n => n !== node);
      },
      error: (err) => {
        console.error('Failed to remove node', err);
      }
    });
  }
}

/*
 * Blockchain Node Service
 * Provides methods to interact with blockchain nodes
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlockchainNodeService {
  private baseUrl = 'https://api.example.com/blockchain-nodes';
  
  constructor(private http: HttpClient) {}
  
  // Retrieves all blockchain nodes
  getAllNodes(): Observable<BlockchainNode[]> {
    return this.http.get<BlockchainNode[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }
  
  // Adds a new blockchain node
  addNode(node: BlockchainNode): Observable<BlockchainNode> {
    return this.http.post<BlockchainNode>(this.baseUrl, node).pipe(
      catchError(this.handleError)
    );
  }
  
  // Removes a blockchain node
  removeNode(node: BlockchainNode): Observable<null> {
    const url = `${this.baseUrl}/${node.id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }
  
  // Handle Http errors
  private handleError(error: any) {
    let errMsg = 'Error occurred';
    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `Server returned code ${error.status} with body: ${error.error}`;
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}

/*
 * Blockchain Node Model
 * Represents a blockchain node
 */
export interface BlockchainNode {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
}
