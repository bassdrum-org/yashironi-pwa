# 確認

https://yashironi-pwa.vercel.app/

# WebGLについて
- 解像度変えってもUIのレイアウト崩れないため、「Canvas Scaler」の「UI Scale Mode」を「Scale With Screen Size」に変更する必要があります

# ServerWorkerについて
- キャッシュを保存して、オフラインで表示できるかどうかをコントロールのスクリプトです
- 自動更新ができないらしいので、必要があれば手動で更新してください
- 例えばキャッシュデータの名前を変えるなど、sw.jsを変更したら更新が必要です
## 手順
1. Google ChromeのInscpect>Applicationを開く
![Screenshot 2024-10-10 at 17 47 51](https://github.com/user-attachments/assets/a80f6597-04d2-4b84-91c3-135bf3a77c65)
2. Updateボタンをクリックすると、Statusに新しいものが出てくる![Screenshot 2024-10-10 at 17 52 35](https://github.com/user-attachments/assets/4ae3596a-a7eb-4c27-9d1b-8b68f62dcc8b)

3. skipWaitingをクリックする
4. 完成![Screenshot 2024-10-10 at 17 53 47](https://github.com/user-attachments/assets/63269466-1e7d-4aae-91b3-2f960b3ab15c)
