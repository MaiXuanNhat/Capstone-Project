# Capstone-Project
# 1. Cài đặt Docker
Cài Docker trên Ubuntu

Để cài đặt Docker Desktop thành công, bạn phải:

Kiểm tra yêu cầu hệ thống.
Có phiên bản 64 bit của Ubuntu Jammy Jellyfish 22.04 (LTS) hoặc Ubuntu Impish Indri 21.10. Docker Desktop được hỗ trợ trên kiến ​​trúc x86_64 (hoặc AMD64).
Gỡ cài đặt bản xem trước hoặc phiên bản beta của Docker Desktop cho Linux. Chạy:
$ sudo apt remove docker-desktop

Để dọn dẹp hoàn chỉnh, hãy xóa các tệp cấu hình và dữ liệu tại $home/.docker/Desktop, SymLink tại /usr/local/bin/com.docker.cli và xóa các tệp dịch vụ Systemd còn lại.

$ rm -r $HOME/.docker/desktop

$ sudo rm /usr/local/bin/com.docker.cli

$ sudo apt purge docker-desktop

Các bước cài đặt Docker Desktop trên Ubuntu :

Cài đặt Docker’s package repository.
Tải phiên bản mới nhất DEB package.
Cài đặt gói với APT như sau:
$ sudo apt-get update

$ sudo apt-get install ./docker-desktop-<version>-<arch>.deb

Chú ý:  Khi kết thúc quá trình cài đặt, APT hiển thị lỗi do cài đặt gói đã tải xuống. Bạn có thể bỏ qua thông báo lỗi này :

N: Download is performed unsandboxed as root, as file '/home/user/Downloads/docker-desktop.deb' couldn't be accessed by user '_apt'. - pkgAcquire::Run (13: Permission denied).
# 2. Khởi chạy các images
$ docker-compose up -d

Để tạm dừng images, sử dụng: $docker-compose stop

Để xóa images, sử dụng: $docker-compose down

# 3. Chạy ứng dụng trên expo-app
$ docker logs expo -f
