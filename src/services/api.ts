import axios, { AxiosInstance, CancelTokenSource } from 'axios';
import { AnimeSearchResponse, AnimeDetailResponse } from '../types/anime';

const API_BASE_URL = 'https://api.jikan.moe/v4';

/**
 * ApiService Class
 * 
 * Handles all API communication with the Jikan API
 * 
 * REQUIREMENT: Cancel any in-flight API requests if user continues typing
 * This class implements request cancellation using Axios cancel tokens
 */
class ApiService {
  private client: AxiosInstance;
  private cancelTokenSource: CancelTokenSource | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });
  }

  /**
   * REQUIREMENT: Cancel in-flight requests
   * 
   * This method cancels any previous in-flight request before making a new one.
   * Called automatically in searchAnime() to ensure only the latest search request
   * completes, preventing race conditions and outdated results.
   */
  cancelPreviousRequest() {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel('New request initiated');
    }
    this.cancelTokenSource = axios.CancelToken.source();
  }

  /**
   * Search for anime
   * 
   * REQUIREMENT: Cancel in-flight requests
   * - Automatically cancels any previous search request before making a new one
   * - Uses Axios cancel tokens to abort in-flight HTTP requests
   * - Prevents race conditions where older requests might return after newer ones
   * 
   * @param query - Search query string
   * @param page - Page number for pagination
   * @returns Promise with anime search results
   */
  async searchAnime(query: string, page: number = 1): Promise<AnimeSearchResponse> {
    // REQUIREMENT: Cancel any in-flight API requests if user continues typing
    // This is called every time a new search is initiated, ensuring that:
    // 1. If user types quickly and multiple searches are queued, only the latest completes
    // 2. Previous requests are cancelled to prevent outdated results from displaying
    // 3. Network resources are not wasted on unnecessary requests
    this.cancelPreviousRequest();
    
    try {
      const response = await this.client.get<AnimeSearchResponse>('/anime', {
        params: {
          q: query,
          page,
          limit: 20,
        },
        // REQUIREMENT: Request cancellation
        // The cancel token allows Axios to abort this request if cancelPreviousRequest()
        // is called again before this request completes
        cancelToken: this.cancelTokenSource?.token,
      });
      return response.data;
    } catch (error) {
      // Handle cancelled requests gracefully (they're expected when user types quickly)
      if (axios.isCancel(error)) {
        throw new Error('Request cancelled');
      }
      throw error;
    }
  }

  async getAnimeById(id: number): Promise<AnimeDetailResponse> {
    try {
      const response = await this.client.get<AnimeDetailResponse>(`/anime/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const apiService = new ApiService();


