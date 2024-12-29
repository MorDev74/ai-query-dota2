import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { filename, data } = await request.json();
    
    // Create the data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data', 'dev');
    await fs.mkdir(dataDir, { recursive: true });
    
    // Save the file
    const filePath = path.join(dataDir, filename);
    console.log(`save to: ${filePath}`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, message: `Saved to ${filename}` });
  } catch (error) {
    console.error('Error saving JSON file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save file' },
      { status: 500 }
    );
  }
} 