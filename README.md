# Bài toán: Xây dựng phần mềm quản lý thu phí chung cư


- [Mô tả yêu cầu](#mô-tả-yêu-cầu)
    - [Phí dịch vụ chung cư](#phí-dịch-vụ-chung-cư)
    - [Phí quản lý chung cư](#phí-quản-lý-chung-cư)
    - [Các khoản đóng góp](#các-khoản-đóng-góp)
- [Phiên bản 1.0](#phiên-bản-10)
    - [Quản lý thông tin các khoản thu phí đóng góp](#quản-lý-thông-tin-các-khoản-thu-phí-đóng-góp)
    - [Quản lý thu phí của các hộ gia đình](#quản-lý-thu-phí-của-các-hộ-gia-đình)
    - [Chức năng tra cứu và tìm kiếm](#chức-năng-tra-cứu-và-tìm-kiếm)
    - [Thống kê cơ bản](#thống-kê-cơ-bản)
    - [Quản lý thông tin cơ bản về các hộ gia đình và nhân khẩu](#quản-lý-thông-tin-cơ-bản-về-các-hộ-gia-đình-và-nhân-khẩu)
    - [Bảo mật và quản lý tài khoản](#bảo-mật-và-quản-lý-tài-khoản)
- [Phiên bản 2.0](#phiên-bản-20)
    - [Quản lý các khoản thu phí gửi xe ở chung cư](#quản-lý-các-khoản-thu-phí-gửi-xe-ở-chung-cư)
    - [Quản lý chi phí điện, nước, internet](#quản-lý-chi-phí-điện-nước-internet)
- [Yêu cầu kỹ thuật](#yêu-cầu-kỹ-thuật)


## Mô tả yêu cầu

Chung cư BlueMoon tọa lạc ngay ngã tư Văn Phú được khởi công xây dựng năm 2021 và hoàn thành vào 2023. Chung cư được xây dựng trên diện tích 450m², gồm 30 tầng, tầng 1 làm kiot, 4 tầng đế, 24 tầng nhà ở và 1 tầng penhouse. Khi sở hữu nhà chung cư, hộ gia đình hoặc chủ sở hữu sẽ phải bỏ ra một khoản kinh phí đóng định kỳ để thực hiện vận hành và bảo dưỡng thường xuyên về cơ sở vật chất. Các hoạt động quản lý và thu phí ở chung cư BlueMoon được thực hiện bởi Ban quản trị chung cư do nhân dân sinh sống ở đây bầu ra.

Hàng tháng Ban quản trị chung cư lập danh sách các khoản phí cần đóng với mỗi hộ gia đình và gửi thông báo thu tiền. Các khoản phí chung cư gồm nhiều loại:

- **Phí dịch vụ chung cư:** đây là loại phí bắt buộc nộp theo tháng, ban quản lý chung cư để chi trả vào các việc như: Lau dọn vệ sinh và bảo dưỡng các khu vực chung, làm đẹp cảnh quan của các khu vực chung; thu gom rác thải, bảo dưỡng sân vườn; đảm bảo an ninh... Phí dịch vụ chung cư được tính theo diện tích căn hộ sở hữu, hiện nay dao động từ 2.500 đồng tới 16.500 đồng/m²/tháng.
- **Phí quản lý chung cư:** đây cũng là chi phí bắt buộc nộp theo tháng, dùng cho tất cả các hoạt động quản lý cũng như vận hành nhà chung cư. Chi phí này phụ thuộc vào tiêu chuẩn, chất lượng của dự án chung cư đó ví dụ như chung cư cao cấp, chung cư thường hay nhà chung cư giá rẻ. Với chung cư BlueMoon phí quản lý ở mức từ 7.000 đồng/m².
- **Các khoản đóng góp:** mà ban quản trị phối hợp với chính quyền địa phương, tổ dân phố để thực hiện thu (ví dụ quỹ vì người nghèo, quỹ biển đảo, quỹ từ thiện,...). Các khoản đóng góp này thu theo từng đợt, không bắt buộc và thu theo tinh thần tự nguyện.

Ban quản trị hiện đang quản lý việc thu phí theo phương thức thủ công, có sử dụng một số công cụ hỗ trợ như Excel nhưng hiệu quả quản lý chưa cao. Hiện tại Ban quản trị có nhu cầu xây dựng một phần mềm quản lý thu các loại phí tại chung cư BlueMoon.

### Ví dụ một mẫu sổ quản lý thu các khoản đóng góp:

| Hộ gia đình | Phí dịch vụ | Phí quản lý | Đóng góp | Tổng cộng |
|-------------|-------------|-------------|----------|-----------|
| Hộ 1        | 500,000 VND | 140,000 VND | 50,000 VND | 690,000 VND |
| Hộ 2        | 700,000 VND | 196,000 VND | 100,000 VND | 996,000 VND |

## Phiên bản 1.0

Trong phiên bản v1.0 của phần mềm, các chức năng cơ bản cần xây dựng cho Ban quản trị bao gồm:

### 1. Quản lý thông tin các khoản thu phí đóng góp
- Quản lý các khoản phí dịch vụ và quản lý của mỗi hộ gia đình.
- Quản lý các khoản đóng góp không bắt buộc.

### 2. Quản lý thu phí của các hộ gia đình
- Theo dõi và ghi nhận các khoản phí đã được thanh toán.
- Cung cấp hóa đơn và biên lai cho các hộ gia đình.

### 3. Chức năng tra cứu và tìm kiếm
- Tra cứu thông tin các khoản phí của từng hộ gia đình.
- Tìm kiếm thông tin liên quan đến các khoản phí và đóng góp.

### 4. Thống kê cơ bản
- Cung cấp báo cáo thống kê về các khoản thu phí.
- Theo dõi tình trạng thanh toán của các hộ gia đình.

### 5. Quản lý thông tin cơ bản về các hộ gia đình và nhân khẩu
- Quản lý thông tin hộ khẩu và nhân khẩu đang sinh sống tại BlueMoon.
- Cung cấp thông tin chi tiết về hộ gia đình, nhân khẩu trong hộ, các hoạt động biến đổi nhân khẩu, tạm vắng, tạm trú,...

### 6. Bảo mật và quản lý tài khoản
- Các chức năng này chỉ truy cập được sau khi Ban quản trị đăng nhập thành công với tài khoản đã cung cấp.
- Ban quản trị cũng có thể quản lý các thông tin cá nhân và thay đổi mật khẩu đăng nhập.

## Phiên bản 2.0

Trong phiên bản v2.0 phát triển tiếp theo của phần mềm, Ban quản trị muốn xây dựng thêm các chức năng:

### 1. Quản lý các khoản thu phí gửi xe ở chung cư
- Thu phí từng tháng theo thông tin phương tiện đăng ký của hộ gia đình.
- Phí gửi xe máy hàng tháng là 70.000 VND/xe/một tháng.
- Phí gửi ô tô là 1.200.000 VND/xe/một tháng.

### 2. Quản lý chi phí điện, nước, internet
- Thu hộ từng tháng theo thông báo từ các công ty cung cấp dịch vụ tương ứng.

## Yêu cầu kỹ thuật

Phần mềm dự kiến được phát triển dưới dạng một ứng dụng desktop với công nghệ Java, dữ liệu của phần mềm được lưu trữ tập trung trên MySQL server. Nhóm phát triển có thể tìm hiểu và lựa chọn các công nghệ khác phù hợp trong xây dựng giải pháp cho bài toán.
