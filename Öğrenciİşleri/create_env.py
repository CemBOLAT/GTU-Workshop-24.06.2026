import os
import random

# Oluşturulacak ana klasör adı
base_dir = "OgrenciOdevleri"

# Test için örnek öğrenci isimleri
students = [
    "Ahmet_Yilmaz", "Ayse_Demir", "Mehmet_Kaya", "Fatma_Celik", 
    "Can_Aslan", "Elif_Sahin", "Mustafa_Ozturk", "Zeynep_Aydin",
    "Burak_Arslan", "Gamze_Koc", "Deniz_Yurt", "Merve_Kilic"
]

# Olası dosya uzantıları (PDF doğru, diğerleri hatalı)
extensions = [".pdf", ".docx", ".txt", ".rar"]

def create_mock_environment():
    # Ana klasör yoksa oluştur
    if not os.path.exists(base_dir):
        os.makedirs(base_dir)
        print(f"'{base_dir}' ana klasörü oluşturuldu.")
    
    print("\n--- Öğrenci Klasörleri ve Ödevleri Oluşturuluyor ---")
    
    for student in students:
        # Her öğrenci için bir alt klasör oluştur
        student_dir = os.path.join(base_dir, student)
        os.makedirs(student_dir, exist_ok=True)
        
        # %70 ihtimalle PDF (doğru), %30 ihtimalle hatalı format seç
        if random.random() < 0.7:
            ext = ".pdf"
        else:
            ext = random.choice([".docx", ".txt", ".rar"])
            
        file_name = f"Dönem_Ödevi_{student}{ext}"
        file_path = os.path.join(student_dir, file_name)
        
        # Boş bir dosya yaz (içeriği önemsiz, uzantı önemli)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"{student} - Yapay Zeka Dersi Dönem Ödevi İçeriği.")
            
        print(f"Oluşturuldu: {file_path}")

    print("\n✅ Test ortamı hazır! Şimdi yapay zekaya promptu vererek test edebilirsin.")

if __name__ == "__main__":
    create_mock_environment()